import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    name: { type: String, required: true },
    address: { type: String, required: true },
    city: String,
    state: String,
    pincode: String,
    image: String,
    totalSubProperties: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("property", propertySchema);
