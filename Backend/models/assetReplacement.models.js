import mongoose from "mongoose";

const assetReplacementSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Changed to "User" for consistency
    reasonForReplacement: { type: String, required: true },
    replacementDetails: {
      requestedAssetDescription: { type: String, required: true },
      requiredSpecifications: { type: String },
      priorityLevel: {
        type: String,
        enum: ["High", "Medium", "Low"],
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Tracks who created the request
  },
  { timestamps: true }
);

const AssetReplacement =
  mongoose.models.AssetReplacement ||
  mongoose.model("AssetReplacement", assetReplacementSchema);

export default AssetReplacement;
