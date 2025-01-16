
import AssetRequest from "../models/assetRequest.models.js";

export const createAssetRequest = async (req, res) => {
    try {
        const { employee, assetCategory, assetDescription, priorityLevel, requiredByDate } = req.body;

        // Validate required fields
        if (!employee || !assetCategory || !assetDescription || !priorityLevel || !requiredByDate) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newRequest = await AssetRequest.create(req.body);
        res.status(201).json({ message: "Asset request created successfully.", request: newRequest });
    } catch (error) {
        res.status(400).json({ message: "Failed to create asset request.", error: error.message });
    }
};
export const getAllAssetRequests = async (req, res) => {
    try {
        const requests = await AssetRequest.find().populate("employee", "fullname email");
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve asset requests.", error: error.message });
    }
};
export const updateAssetRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        if (!status || !["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid or missing status." });
        }

        const updatedRequest = await AssetRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Asset request not found." });
        }

        res.status(200).json({ message: "Asset request status updated successfully.", request: updatedRequest });
    } catch (error) {
        res.status(400).json({ message: "Failed to update asset request status.", error: error.message });
    }
};
