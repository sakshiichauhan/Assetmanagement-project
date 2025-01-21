import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        model: { type: String, required: true },
        serialNumber: { type: String, required: true, unique: true },
        condition: { type: String, enum: ["new", "used", "refurbished"], required: true },
        assetType: { type: String, required: true },
        room: { type: String, default: null },
        assignedDate: { type: Date, default: Date.now },
        returnDate: { type: Date, default: null },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);

export default Asset;
