import AssetMaintenance from "../models/maintainance.model.js";

export const createAssetMaintenance = async (req, res) => {
    try {
        const newMaintenance = await AssetMaintenance.create(req.body);
        res.status(201).json(newMaintenance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllAssetMaintenances = async (req, res) => {
    try {
        const maintenances = await AssetMaintenance.find().populate("asset");
        res.status(200).json(maintenances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAssetMaintenance = async (req, res) => {
    try {
        const updatedMaintenance = await AssetMaintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMaintenance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
