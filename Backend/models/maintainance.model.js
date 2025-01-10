import mongoose from "mongoose";

const assetMaintenanceSchema = new mongoose.Schema(
    {
        asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
        details: { type: String },
        maintenanceType: { type: String, required: true },
        scheduledDate: { type: Date, default: Date.now },
        status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    },
    { timestamps: true }
);

const AssetMaintenance = mongoose.models.AssetMaintenance || mongoose.model("AssetMaintenance", assetMaintenanceSchema);

export default AssetMaintenance;
