import AssetRequest from "../models/assetRequest.models.js";

export const createAssetRequest = async (req, res) => {
    try {
        const newRequest = await AssetRequest.create(req.body);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllAssetRequests = async (req, res) => {
    try {
        const requests = await AssetRequest.find().populate("employee");
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAssetRequestStatus = async (req, res) => {
    try {
        const updatedRequest = await AssetRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
