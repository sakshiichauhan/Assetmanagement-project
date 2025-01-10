import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        model: { type: String, required: true },
        serialNumber: { type: String, required: true, unique: true },
        condition: { type: String, enum: ["new", "used", "refurbished"], required: true },
        assetType: { type: String, enum: ["hardware", "furniture", "other"], required: true },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
        room: { type: String, default: null },
        assignedDate: { type: Date, default: Date.now },
        returnDate: { type: Date, default: null },
    },
    { timestamps: true }
);

const Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);

export default Asset;
