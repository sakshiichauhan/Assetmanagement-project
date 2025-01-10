import mongoose from "mongoose";

const assetReplacementSchema = new mongoose.Schema(
    {
        asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
        employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
        reasonForReplacement: { type: String, required: true },
        replacementDetails: {
            requestedAssetDescription: { type: String, required: true },
            requiredSpecifications: { type: String },
            priorityLevel: { type: String, enum: ["High", "Medium", "Low"], required: true },
        },
    },
    { timestamps: true }
);

const AssetReplacement = mongoose.models.AssetReplacement || mongoose.model("AssetReplacement", assetReplacementSchema);

export default AssetReplacement;
