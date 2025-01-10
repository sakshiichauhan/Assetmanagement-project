import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        employeeId: { type: String, required: true, unique: true },
        department: { type: String, required: true },
        jobTitle: { type: String, required: true },
        email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, "Invalid email"] },
        phone: { type: String, required: true, match: [/^\+?(\d.*){3,}$/, "Invalid phone number"] },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset", default: [] }],
        assetMaintenance: [{ type: mongoose.Schema.Types.ObjectId, ref: "AssetMaintenance", default: [] }],
        assetReplacements: [{ type: mongoose.Schema.Types.ObjectId, ref: "AssetReplacement", default: [] }],
        assetRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "AssetRequest", default: [] }],
    },
    { timestamps: true }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
