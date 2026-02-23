import Payment from "../models/Payment_Model.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Due from "../models/Due_Model.js";
import Notification from "../models/Notification_Model.js";

// Create a new rent payment
export const createRentPayment = async ({
  userId,
  referenceId,
  amount,
  rentMonth,
}) => {
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `rent_${referenceId}_${rentMonth}`,
  });

  const payment = await Payment.create({
    userId,
    purpose: "RENT",
    referenceId,
    amount,
    rentMonth,
    gatewayOrderId: order.id,
    status: "PENDING",
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    paymentId: payment._id,
  };
};

// Verify Razorpay payment and update due
export const verifyPayment = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) => {
  const payment = await Payment.findOne({ gatewayOrderId: razorpay_order_id });
  if (!payment) throw new Error("Payment record not found");

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    payment.status = "FAILED";
    await payment.save();
    throw new Error("Invalid payment signature");
  }

  payment.gatewayPaymentId = razorpay_payment_id;
  payment.gatewaySignature = razorpay_signature;
  payment.status = "SUCCESS";
  await payment.save();

  const due = await Due.findById(payment.referenceId)
    .populate("tenantId", "firstName lastName")
    .populate({
      path: "subPropertyId",
      select: "unitName",
      populate: { path: "propertyId", select: "name" },
    });

  if (!due) throw new Error("Due record not found for payment");

  due.status = "PAID";
  due.paymentId = payment._id;
  await due.save();

  const nextDueDate = new Date(due.dueDate);
  nextDueDate.setMonth(nextDueDate.getMonth() + 1);

  await Due.create({
    tenantId: due.tenantId,
    landlordId: due.landlordId,
    subPropertyId: due.subPropertyId,
    dueDate: nextDueDate,
    month: nextDueDate.getMonth() + 1,
    year: nextDueDate.getFullYear(),
    amount: due.amount,
    status: "UNPAID",
  });

  const tenantName = `${due.tenantId.firstName} ${due.tenantId.lastName}`;
  const propertyName = due.subPropertyId.propertyId?.name || "";
  const unitName = due.subPropertyId.unitName || "";

  await Notification.create({
    userId: due.tenantId,
    type: "RENT",
    message: `Your rent payment of ₹${due.amount} for ${propertyName} - ${unitName} (${due.month}/${due.year}) was successful.`,
  });

  await Notification.create({
    userId: due.landlordId,
    type: "RENT",
    message: `Rent of ₹${due.amount} received from ${tenantName} for ${propertyName} - ${unitName} (${due.month}/${due.year}).`,
  });

  return {
    success: true,
    message: "Payment verified, due updated, next rent scheduled",
    paymentId: payment._id,
    dueId: due._id,
  };
};

// Get payments for a user
export const getMyPayments = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  return Payment.find({ userId }).sort({ createdAt: -1 }).lean();
};
