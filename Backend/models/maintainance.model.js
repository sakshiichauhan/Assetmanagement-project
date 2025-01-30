import mongoose from "mongoose";

const assetMaintenanceSchema = new mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
    },
    maintenanceType: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
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

export default mongoose.models.AssetMaintenance ||
  mongoose.model("AssetMaintenance", assetMaintenanceSchema);
