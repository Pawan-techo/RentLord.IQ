import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      enum: ["BASIC", "PRO", "PREMIUM"],
      default: "BASIC",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED"],
      default: "ACTIVE",
    },
    startDate:{type:Date,default:Date.now()},
    endDate: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required:true },
    password: { type: String, required:true },
    address: { type: String },
    image: { type: String,default: "https://ik.imagekit.io/pawan123/RentLordIQ-Images/profile.jpg?updatedAt=1768473498164" },
    role: {
      type: String,
      enum: ["LANDLORD", "TENANT", "ADMIN"],
      default: "LANDLORD",
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    subscription: subscriptionSchema,
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
