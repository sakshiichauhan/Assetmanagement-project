import AssetReplacement from "../models/assetReplacement.models.js";
import Asset from "../models/asset.models.js";
import User from "../models/user.js";

// Create a new asset replacement request
export const createAssetReplacement = async (req, res) => {
    try {
        const { asset, employee, reasonForReplacement, replacementDetails } = req.body;

        // Validate input
        if (!asset || !employee || !reasonForReplacement || !replacementDetails?.requestedAssetDescription) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        // Validate the asset
        const existingAsset = await Asset.findById(asset);
        if (!existingAsset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found.",
            });
        }

        // Validate the employee
        const existingEmployee = await User.findById(employee);
        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found.",
            });
        }

        // Create the replacement request
        const newReplacement = await AssetReplacement.create({
            asset,
            employee,
            reasonForReplacement,
            replacementDetails,
            createdBy: req.userId, // Assuming `req.userId` is set from authentication middleware
        });

        res.status(201).json({
            success: true,
            message: "Asset replacement request created successfully.",
            data: newReplacement,
        });
    } catch (error) {
        console.error("Error creating asset replacement request:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get all asset replacement requests
export const getAllAssetReplacements = async (req, res) => {
    try {
        const replacements = await AssetReplacement.find()
            .populate("asset", "name serialNumber")
            .populate("employee", "fullname email")
            .populate("createdBy", "fullname email");

        if (!replacements || replacements.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No asset replacements found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Asset replacement requests retrieved successfully.",
            data: replacements,
        });
    } catch (error) {
        console.error("Error retrieving asset replacements:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get asset replacement requests for a specific user
export const getAssetReplacementsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const userReplacements = await AssetReplacement.find({ createdBy: userId })
            .populate("asset", "name serialNumber")
            .populate("employee", "fullname email")
            .populate("createdBy", "fullname email");

        if (!userReplacements || userReplacements.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No asset replacements found for this user.",
            });
        }

        res.status(200).json({
            success: true,
            message: `Asset replacement requests for user ID: ${userId}`,
            data: userReplacements,
        });
    } catch (error) {
        console.error("Error retrieving asset replacements for user:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update an asset replacement request
export const updateAssetReplacement = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedReplacement = await AssetReplacement.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("asset", "name serialNumber")
            .populate("employee", "fullname email")
            .populate("createdBy", "fullname email");

        if (!updatedReplacement) {
            return res.status(404).json({
                success: false,
                message: `Asset replacement request with ID ${id} not found.`,
            });
        }

        res.status(200).json({
            success: true,
            message: "Asset replacement request updated successfully.",
            data: updatedReplacement,
        });
    } catch (error) {
        console.error("Error updating asset replacement request:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Delete an asset replacement request
export const deleteAssetReplacement = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReplacement = await AssetReplacement.findByIdAndDelete(id);

        if (!deletedReplacement) {
            return res.status(404).json({
                success: false,
                message: `Asset replacement request with ID ${id} not found.`,
            });
        }

        res.status(200).json({
            success: true,
            message: "Asset replacement request deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting asset replacement request:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
