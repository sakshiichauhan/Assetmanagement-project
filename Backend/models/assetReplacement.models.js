import mongoose from "mongoose";

const assetReplacementSchema = new mongoose.Schema(
  {
    reasonForReplacement: {
      type: String,
      required: true, 
    },
    requestedAssetDescription: {
      type: String,
      required: true, 
    },
    requiredSpecifications: {
      type: String, 
    },
    priorityLevel: {
      type: String,
      enum: ["Low", "Medium", "High"], 
      required: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset", 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true } 
);

export default mongoose.models.AssetReplacement ||
  mongoose.model("AssetReplacement", assetReplacementSchema);
