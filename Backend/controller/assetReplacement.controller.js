
import AssetReplacement from "../models/assetReplacement.models.js";


export const createAssetReplacement = async (req, res) => {
    try {
        const newReplacement = await AssetReplacement.create(req.body);
        res.status(201).json({
            success: true,
            message: "Asset replacement request created successfully",
            data: newReplacement,
        });
    } catch (error) {
        console.error("Error creating asset replacement request:", error.message);
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: "Invalid input data",
                error: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
};

export const getAllAssetReplacements = async (req, res) => {
    try {
        const replacements = await AssetReplacement.find().populate(["asset", "employee"]);
        if (!replacements || replacements.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No asset replacements found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Asset replacements retrieved successfully",
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

export const updateAssetReplacement = async (req, res) => {
    try {
        const updatedReplacement = await AssetReplacement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedReplacement) {
            return res.status(404).json({
                success: false,
                message: `Asset replacement with ID ${req.params.id} not found`,
            });
        }
        res.status(200).json({
            success: true,
            message: "Asset replacement updated successfully",
            data: updatedReplacement,
        });
    } catch (error) {
        console.error("Error updating asset replacement:", error.message);
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: `Invalid ID format: ${req.params.id}`,
                error: error.message,
            });
        } else if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: "Validation error while updating asset replacement",
                error: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
};
