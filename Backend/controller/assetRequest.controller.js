import AssetRequest from "../models/assetRequest.models.js";
import User from "../models/user.js";

export const createAssetRequest = async (req, res) => {
  try {const {
    requestDate,
    assetCategory,
    assetDescription,
    specifications,
    reason,
    priorityLevel,
    requiredByDate
  } = req.body;

  
    if (!req.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const newAssetRequest = await AssetRequest.create({
      // If requestDate was not provided, AssetRequest schema defaults it to Date.now
      requestDate: requestDate || undefined, 
      assetCategory,
      assetDescription,
      specifications,
      reason,
      priorityLevel,
      requiredByDate,
      createdBy: req.id
    });

    // 2) Update the User's assetRequests array and increment requestCount
    await User.findByIdAndUpdate(
      req.id,
      {
        $push: { assetRequests: newAssetRequest._id },
        $inc: { requestCount: 1 }
      },
      { new: true } // if you want the updated doc returned
    );

    // 3) Return a response similar to createAssetMaintenance
    return res.status(201).json({
      message: "Asset request created successfully",
      newAssetRequest
    });

  } catch (error) {
    return res.status(400).json({
      message: "Error creating asset request",
      error: error.message
    });
  }
};


// Get all
export const getAllAssetRequests = async (req, res) => {
  try {
    // Populate the createdBy field if you want user info
    const requests = await AssetRequest.find().populate("createdBy", "name email");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateAssetRequestStatus = async (req, res) => {
  try {
    const updatedRequest = await AssetRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const createMultipleAssetRequests = async (req, res) => {
  try {
    const userId = req.id;
    const { requests } = req.body;

    if (!Array.isArray(requests)) {
      return res.status(400).json({ error: "Body must have a 'requests' array" });
    }

    // Prepare data for AssetRequest creation
    const data = requests.map((item) => {
      // remove any incoming 'id' field
      if (item.id) {
        delete item.id;
      }
      return { ...item, createdBy: userId };
    });

    // 1. Insert the documents
    const newRequests = await AssetRequest.insertMany(data);

    // 2. Update user in one go
    const requestIds = newRequests.map((reqDoc) => reqDoc._id);
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { assetRequests: { $each: requestIds } },
        $inc: { requestCount: newRequests.length },
      },
      { new: true }
    );

    res.status(201).json(newRequests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
