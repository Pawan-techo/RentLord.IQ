import crypto from "crypto";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Invitation from "../models/Invitation_Model.js";
import User from "../models/User_Model.js";
import SubProperty from "../models/SubProperty_Model.js";
import TenantHistory from "../models/TenantsHistory_Model.js";
import Property from "../models/Property_Model.js";
import Notification from "../models/Notification_Model.js";
import { sendInviteEmail } from "../utils/sendInviteEmail.js";
import Due_Model from "../models/Due_Model.js";

// Invite a new tenant
export const inviteTenantService = async ({
  landlordId,
  firstName,
  lastName,
  email,
  phone,
  subPropertyId,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists with this email");

  const existingInvite = await Invitation.findOne({ email, status: "PENDING" });
  if (existingInvite) throw new Error("Invitation already sent to this email");

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const invite = await Invitation.create({
    landlordId,
    firstName,
    lastName,
    email,
    phone,
    subPropertyId,
    token: hashedToken,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const inviteLink = `${process.env.FRONTEND_URL}/set-password?token=${rawToken}`;
  await sendInviteEmail(email, inviteLink, firstName);

  return { message: "Invitation sent successfully", inviteId: invite._id };
};

// Accept invitation and set password for new tenant
export const acceptInviteSetPasswordService = async ({ token, password }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const invite = await Invitation.findOne({
    token: hashedToken,
    status: "PENDING",
    expiresAt: { $gt: new Date() },
  });
  if (!invite) throw new Error("Invalid or expired invitation");

  const subProperty = await SubProperty.findById(invite.subPropertyId);
  if (!subProperty || subProperty.status === "OCCUPIED")
    throw new Error("SubProperty unavailable");

  const property = await Property.findById(subProperty.propertyId);
  const hashedPassword = await bcrypt.hash(password, 10);

  const tenant = await User.create({
    firstName: invite.firstName,
    lastName: invite.lastName,
    email: invite.email,
    phone: invite.phone,
    role: "TENANT",
    password: hashedPassword,
    status: "ACTIVE",
  });

  subProperty.currentTenantId = tenant._id;
  subProperty.status = "OCCUPIED";
  subProperty.lease = { startDate: new Date() };
  await subProperty.save();

  await TenantHistory.create({
    tenantId: tenant._id,
    landlordId: invite.landlordId,
    propertyId: property._id,
    subPropertyId: subProperty._id,
    rentAmount: subProperty.rentAmount,
    moveInDate: new Date(),
  });

  // First rent due calculation
  const RENT_DUE_DAY = 5;
  const leaseStartDate = new Date();
  const dueDate =
    leaseStartDate.getDate() <= RENT_DUE_DAY
      ? new Date(
          leaseStartDate.getFullYear(),
          leaseStartDate.getMonth(),
          RENT_DUE_DAY,
        )
      : new Date(
          leaseStartDate.getFullYear(),
          leaseStartDate.getMonth() + 1,
          RENT_DUE_DAY,
        );

  const month = dueDate.getMonth() + 1;
  const year = dueDate.getFullYear();

  await Due_Model.create({
    tenantId: tenant._id,
    landlordId: invite.landlordId,
    subPropertyId: subProperty._id,
    amount: subProperty.rentAmount,
    dueDate,
    month,
    year,
    status: "UNPAID",
  });

  await Notification.create({
    userId: invite.landlordId,
    type: "TENANT",
    message: `Tenant ${tenant.firstName} ${tenant.lastName} has accepted the invitation and moved into ${property.name} - ${subProperty.unitName}.`,
  });

  await Notification.create({
    userId: tenant._id,
    type: "PROPERTY",
    message: `Welcome! You have been assigned to ${property.name} - ${subProperty.unitName}.`,
  });

  invite.status = "ACCEPTED";
  await invite.save();

  return {
    message: "Tenant onboarded successfully",
    tenantId: tenant._id,
    subPropertyId: subProperty._id,
  };
};

// Invite existing tenant
export const inviteExistingTenantService = async ({
  landlordId,
  email,
  subPropertyId,
}) => {
  const tenant = await User.findOne({ email });
  if (!tenant) throw new Error("Tenant account not found with this email");
  if (tenant.role !== "TENANT")
    throw new Error("User is not registered as a tenant");

  const assignedSubProperty = await SubProperty.findOne({
    currentTenantId: tenant._id,
  });
  if (assignedSubProperty)
    throw new Error(
      `Tenant is already assigned to a rented property`,
    );

  const subProperty = await SubProperty.findById(subPropertyId);
  if (!subProperty || subProperty.status === "OCCUPIED")
    throw new Error("SubProperty unavailable");

  const existingInvite = await Invitation.findOne({
    email,
    subPropertyId,
    status: "PENDING",
  });
  if (existingInvite) throw new Error("Invitation already sent to this tenant");

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const invite = await Invitation.create({
    landlordId,
    firstName: tenant.firstName,
    lastName: tenant.lastName,
    email: tenant.email,
    phone: tenant.phone,
    subPropertyId,
    token: hashedToken,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const inviteLink = `${process.env.FRONTEND_URL}/accept-existing?token=${rawToken}`;
  await sendInviteEmail(tenant.email, inviteLink, tenant.firstName);

  return {
    message: "Existing tenant invitation sent successfully",
    inviteId: invite._id,
  };
};

// Accept invitation for existing tenant
export const acceptExistingTenantService = async ({ token }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const invite = await Invitation.findOne({
      token: hashedToken,
      status: "PENDING",
      expiresAt: { $gt: new Date() },
    }).session(session);
    if (!invite) throw new Error("Invalid or expired invitation");

    const subProperty = await SubProperty.findById(
      invite.subPropertyId,
    ).session(session);
    if (!subProperty || subProperty.status === "OCCUPIED")
      throw new Error("SubProperty unavailable");

    const property = await Property.findById(subProperty.propertyId).session(
      session,
    );
    const tenant = await User.findOne({ email: invite.email }).session(session);
    if (!tenant) throw new Error("Tenant account not found");

    subProperty.currentTenantId = tenant._id;
    subProperty.status = "OCCUPIED";
    subProperty.lease = { startDate: new Date() };
    await subProperty.save({ session });

    await TenantHistory.create(
      [
        {
          tenantId: tenant._id,
          landlordId: invite.landlordId,
          propertyId: property._id,
          subPropertyId: subProperty._id,
          rentAmount: subProperty.rentAmount,
          moveInDate: new Date(),
        },
      ],
      { session },
    );

    const RENT_DUE_DAY = 5;
    const leaseStartDate = new Date();
    const dueDate =
      leaseStartDate.getDate() <= RENT_DUE_DAY
        ? new Date(
            leaseStartDate.getFullYear(),
            leaseStartDate.getMonth(),
            RENT_DUE_DAY,
          )
        : new Date(
            leaseStartDate.getFullYear(),
            leaseStartDate.getMonth() + 1,
            RENT_DUE_DAY,
          );

    await Due_Model.create(
      [
        {
          tenantId: tenant._id,
          landlordId: invite.landlordId,
          subPropertyId: subProperty._id,
          amount: subProperty.rentAmount,
          dueDate,
          month: dueDate.getMonth() + 1,
          year: dueDate.getFullYear(),
          status: "UNPAID",
        },
      ],
      { session },
    );

    await Notification.insertMany(
      [
        {
          userId: invite.landlordId,
          type: "TENANT",
          message: `Tenant ${tenant.firstName} ${tenant.lastName} has moved into ${property.name} - ${subProperty.unitName}.`,
        },
        {
          userId: tenant._id,
          type: "PROPERTY",
          message: `You have been assigned to ${property.name} - ${subProperty.unitName}.`,
        },
      ],
      { session },
    );

    invite.status = "ACCEPTED";
    await invite.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Existing tenant assigned successfully",
      tenantId: tenant._id,
      subPropertyId: subProperty._id,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Get pending invitation by subProperty
export const getInvitationsBySubPropertyService = async ({
  subPropertyId,
  landlordId,
}) => {
  if (!subPropertyId) throw new Error("SubProperty ID is required");

  return await Invitation.findOne({
    subPropertyId,
    landlordId,
    status: "PENDING",
  })
    .sort({ createdAt: -1 })
    .select("-token");
};
