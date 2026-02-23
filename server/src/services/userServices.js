import User from "../models/User_Model.js";
import bcrypt from "bcrypt";
import { getUserIdFromToken } from "../config/jwtProvider.js";
import SubProperty from "../models/SubProperty_Model.js";

//Create User
export const createUser = async (userData) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      address,
      image,
      role,
    } = userData;
    const userRole = role || "LANDLORD";
    if (!firstName || !email || !password) {
      throw new Error("Missing required fields");
    }
    const existingUser = await User.findOne({ email });
if (existingUser) {
  throw new Error("User with this email already exists");
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address,
      image,
      role: role || "LANDLORD",
      status: "ACTIVE",
      subscription:
        userRole === "LANDLORD"
          ? {
              plan: "BASIC",
              status: "ACTIVE",
              startDate: new Date(),
              endDate: null,
            }
          : undefined,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    throw new Error(error.message);
  }
};

// Find user by id
export const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user not found with id :", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get user by email
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found with email :", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get user profile by token
export const getUserProfileByToken = async (token) => {
  try {
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found with Id: " + userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Get all users
export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Get all tenant for landlord
export const getMyTenantsService = async (landlordId) => {
  const tenants = await SubProperty.find({
    landlordId,
    currentTenantId: { $ne: null },
  })
    .populate("currentTenantId", "firstName lastName email phone image")
    .populate("propertyId", "name address")
    .sort({ createdAt: -1 });

  return tenants;
};

//Get a landlord for tenant
export const getMyLandlordService = async (tenantId) => {
  const unit = await SubProperty.findOne({
    currentTenantId: tenantId,
  })
    .populate("landlordId", "firstName lastName email phone image")
    .populate("propertyId", "name address")
    .select("unitName rentAmount status lease");
  if (!unit) {
    throw new Error("No landlord assigned");
  }
  
  return unit;
};

//Update subscription for landlord
export const updateSubscriptionService = async (userId, subscriptionData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "LANDLORD") {
    throw new Error("Only landlords can have subscriptions");
  }

  const { plan, billingCycle } = subscriptionData;

  const durationInDays = billingCycle === "yearly" ? 365 : 30;

  const startDate = new Date();
  const endDate = new Date(
    Date.now() + durationInDays * 24 * 60 * 60 * 1000
  );

  user.subscription = {
    plan,
    status: "ACTIVE",
    startDate,
    endDate,
  };

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

//Update profile image for landlord
export const updateProfileImageService = async (userId, image) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.image = image;
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

