import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    agreementFile: String,
  },
  { _id: false }
);

const subPropertySchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },

    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    unitName: { type: String, required: true },
    rentAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["VACANT", "OCCUPIED"],
      default: "VACANT",
    },

    currentTenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },

    lease: leaseSchema,
  },
  { timestamps: true }
);

export default mongoose.model("subProperty", subPropertySchema);
