import Asset from "../models/asset.models.js";
import User from "../models/user.js";

export const createAsset = async (req, res) => {
    try {
        const newAsset = await Asset.create(req.body);
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(400).json({ message: "Error creating asset.", error: error.message });
    }
};

export const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find().populate("assignedTo");
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assets.", error: error.message });
    }
};

export const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id).populate("assignedTo");
        if (!asset) return res.status(404).json({ message: "Asset not found." });
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ message: "Error fetching asset.", error: error.message });
    }
};

export const updateAsset = async (req, res) => {
    try {
        const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAsset) return res.status(404).json({ message: "Asset not found." });
        res.status(200).json(updatedAsset);
    } catch (error) {
        res.status(400).json({ message: "Error updating asset.", error: error.message });
    }
};



