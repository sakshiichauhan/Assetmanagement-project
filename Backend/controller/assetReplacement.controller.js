
import AssetReplacement from "../models/assetReplacement.models.js";


// Create a new asset replacement request
export const createAssetReplacement = async (req, res) => {
  try {
    const { reasonForReplacement, requestedAssetDescription, requiredSpecifications, priorityLevel, asset } = req.body;
    
    if (!req.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }


    const newAssetReplacement = new AssetReplacement({
      reasonForReplacement,
      requestedAssetDescription,
      requiredSpecifications,
      priorityLevel,
      asset,
      createdBy: req.id,
    });

    await newAssetReplacement.save();
    res.status(201).json({ message: "Asset replacement request created successfully", newAssetReplacement });
  } catch (error) {
    res.status(500).json({ message: "Error creating asset replacement request", error: error.message });
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
