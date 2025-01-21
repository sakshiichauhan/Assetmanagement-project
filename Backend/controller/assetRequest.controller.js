import User from "../models/user.js";
import AssetRequest from "../models/assetRequest.models.js";

export const createAssetRequest = async (req, res) => {
    try {
        const { userId, assetCategory, assetDescription, specifications, reason, priorityLevel, requiredByDate } = req.body;

        // Validate user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Create the asset request
        const assetRequest = new AssetRequest({
            user: userId,
            createdBy: req.userId, // Assuming logged-in user ID is passed in the request
            assetCategory,
            assetDescription,
            specifications,
            reason,
            priorityLevel,
            requiredByDate,
        });

        await assetRequest.save();

        // Update the user's request count
        user.requestCount += 1;
        await user.save();

        res.status(201).json({ message: "Asset request created successfully.", assetRequest });
    } catch (error) {
        res.status(500).json({ message: "Failed to create asset request.", error: error.message });
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
