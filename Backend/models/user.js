import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], required: true },
    personalInfo: {
      phone: {
        type: String,
        match: [/^\+?(\d.*){3,}$/, "Invalid phone number"],
      },
      address: { type: String },
      department: { type: String },
      jobTitle: { type: String },
      employeeId: { type: String, unique: true },
    },
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }], // One-to-Many relationship
    assetRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AssetRequest" },
    ], // One-to-Many relationship
    assetMaintenance: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AssetMaintenance" },
    ],
    assetReplacements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AssetReplacement" },
    ],
    requestCount: { type: Number, default: 0 }, // Track the number of requests sent
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
