import mongoose from "mongoose";

const assetRequestSchema = new mongoose.Schema(
  {
    requestDate: {
      type: Date,
      default: Date.now,
    },
    assetCategory: {
      type: String,
      required: true,
    },
    assetDescription: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
    },
    reason: {
      type: String,
    },
    priorityLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    requiredByDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models.AssetRequest ||
  mongoose.model("AssetRequest", assetRequestSchema);
