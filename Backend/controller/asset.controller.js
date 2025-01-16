import Asset from "../models/asset.models.js";
import User from "../models/user.js";
import Employee from "../models/employee.models.js";

// Create a new asset
export const createAsset = async (req, res) => {
    try {
        const { name, description, model, serialNumber, condition, assetType } = req.body;

        // Validate input data
        if (!name || !description || !model || !serialNumber || !condition || !assetType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAsset = await Asset.create(req.body);
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(400).json({ message: "Asset creation failed", error: error.message });
    }
};

// Get all assets with optional keyword search
export const getAllAssets = async (req, res) => {
    try {
        const { keyword } = req.query;

        // Build a filter for keyword search
        let filter = {};
        if (keyword) {
            const regex = new RegExp(keyword, "i"); // Case-insensitive partial match
            filter = {
                $or: [
                    { name: regex },
                    { description: regex },
                    { model: regex },
                    { serialNumber: regex },
                ],
            };
        }

        const assets = await Asset.find(filter).populate("assignedTo", "fullname email");
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve assets", error: error.message });
    }
};

// Get asset by ID
export const getAssetById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({ message: "Asset ID is required" });
        }

        const asset = await Asset.findById(id).populate("assignedTo", "fullname email");
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve asset", error: error.message });
    }
};

// Update an asset by ID
export const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({ message: "Asset ID is required" });
        }

        const updatedAsset = await Asset.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAsset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.status(200).json(updatedAsset);
    } catch (error) {
        res.status(400).json({ message: "Failed to update asset", error: error.message });
    }
};

// Delete an asset by ID
export const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({ message: "Asset ID is required" });
        }

        const deletedAsset = await Asset.findByIdAndDelete(id);
        if (!deletedAsset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete asset", error: error.message });
    }
};

// Assign an asset to an employee
export const assignAssetToEmployee = async (req, res) => {
    try {
        const { userId, assetId } = req.body;

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the employee linked to the user
        const employee = await Employee.findOne({ userId: user._id });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found for the provided user" });
        }

        // Find the asset
        const asset = await Asset.findById(assetId);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        // Check if the asset is already assigned
        if (asset.assignedTo) {
            return res.status(400).json({ message: "Asset is already assigned to another employee" });
        }

        // Link asset to the employee
        asset.assignedTo = employee._id; // Reference the employee's ID
        await asset.save();

        // Add asset to the employee's list
        employee.assets.push(asset._id);
        await employee.save();

        res.status(200).json({ message: "Asset assigned successfully", employee });
    } catch (error) {
        res.status(500).json({ message: "Failed to assign asset", error: error.message });
    }
};
