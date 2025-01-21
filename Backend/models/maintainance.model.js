import mongoose from "mongoose";

const assetMaintenanceSchema = new mongoose.Schema(
    {
        asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true }, // Reference to the Asset model
        details: { type: String }, // Details of the maintenance
        maintenanceType: { type: String, required: true }, // Type of maintenance
        scheduledDate: { type: Date, default: Date.now }, // Scheduled date for maintenance
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending" // Current status of the maintenance
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who created the request
    },
    { timestamps: true }
);

const AssetMaintenance =
    mongoose.models.AssetMaintenance || mongoose.model("AssetMaintenance", assetMaintenanceSchema);

export default AssetMaintenance;
