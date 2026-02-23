import mongoose from "mongoose";

const tenantHistorySchema = new mongoose.Schema(
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

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },

    subPropertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subProperty",
      required: true,
    },

    rentAmount: Number,
    moveInDate: Date,
    moveOutDate: Date,
    reasonForLeaving: String,
  },
  { timestamps: true }
);

export default mongoose.model("tenanthistory", tenantHistorySchema);
