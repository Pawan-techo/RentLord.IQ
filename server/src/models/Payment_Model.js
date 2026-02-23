import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    purpose: {
      type: String,
      enum: ["RENT", "SUBSCRIPTION"],
      required: true,
      index: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    method: {
      type: String,
      default: "CARD",
    },
    
    gateway: {
      type: String,
      enum: ["RAZORPAY"],
      default: "RAZORPAY",
    },

    gatewayOrderId: String,
    gatewayPaymentId: String,
    gatewaySignature: String,

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
      index: true,
    },
    rentMonth: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("payment", paymentSchema);
