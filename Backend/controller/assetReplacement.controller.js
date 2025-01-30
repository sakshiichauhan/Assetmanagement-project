import AssetReplacement from "../models/assetReplacement.models.js";
import User from "../models/user.js";

export const createAssetReplacement = async (req, res) => {
  try {
    const {
      reasonForReplacement,
      requestedAssetDescription,
      requiredSpecifications,
      priorityLevel,
      asset
    } = req.body;

    // Ensure the user is authenticated
    if (!req.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    // 1) Create the new replacement document
    const newAssetReplacement = await AssetReplacement.create({
      reasonForReplacement,
      requestedAssetDescription,
      requiredSpecifications,
      priorityLevel,
      asset,
      createdBy: req.id,
    });

    // 2) Update the User's assetReplacements array
    await User.findByIdAndUpdate(
      req.id, // userId
      { $push: { assetReplacements: newAssetReplacement._id } },
      { new: true }
    );

    // 3) Send response
    return res.status(201).json({
      message: "Asset replacement request created successfully",
      newAssetReplacement,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating asset replacement request",
      error: error.message,
    });
  }
};

// Get all asset replacement requests
export const getAllAssetReplacements = async (req, res) => {
  try {
    const assetReplacements = await AssetReplacement.find().populate("asset createdBy");
    res.status(200).json(assetReplacements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching asset replacement requests", error: error.message });
  }
}



export const updateAssetReplacement = async (req, res) => {
  try {
    const updatedAssetReplacement = await AssetReplacement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAssetReplacement) {
      return res.status(404).json({ message: "Asset replacement request not found" });
    }
    res.status(200).json({ message: "Asset replacement request updated successfully", updatedAssetReplacement });
  } catch (error) {
    res.status(500).json({ message: "Error updating asset replacement request", error: error.message });
  }
};
