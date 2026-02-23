import mongoose from "mongoose";

const dueSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    subPropertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subProperty",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },

    month: { type: Number },
    year: { type: Number},

    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["PAID", "UNPAID", "PARTIAL","CANCELLED"],
      default: "UNPAID",
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("due", dueSchema);
