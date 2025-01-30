import AssetMaintenance from "../models/maintainance.model.js";
import User from "../models/user.js";

export const createAssetMaintenance = async (req, res) => {
  try {
    const { details, maintenanceType, scheduledDate, asset } = req.body;

    // Ensure the user is authenticated
    if (!req.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    // 1) Create the new maintenance document
    const newAssetMaintenance = await AssetMaintenance.create({
      details,
      maintenanceType,
      scheduledDate,
      asset,
      createdBy: req.id,
    });

    // 2) Update the User's assetMaintenance array
    await User.findByIdAndUpdate(
      req.id, // userId
      { $push: { assetMaintenance: newAssetMaintenance._id } },
      { new: true } // returns the updated user doc if needed
    );

    // 3) Send response
    return res.status(201).json({
      message: "Asset maintenance request created successfully",
      newAssetMaintenance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating asset maintenance request",
      error: error.message,
    });
  }
};

// READ all asset maintenance requests
export const getAllAssetMaintenance = async (req, res) => {
  try {
    const assetMaintenanceRecords = await AssetMaintenance.find().populate("asset createdBy");
    res.status(200).json(assetMaintenanceRecords);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching asset maintenance requests", error: error.message });
  }
};

// READ one asset maintenance request by ID
export const getAssetMaintenanceById = async (req, res) => {
  try {
    const assetMaintenance = await AssetMaintenance.findById(req.params.id).populate("asset createdBy");
    if (!assetMaintenance) {
      return res
        .status(404)
        .json({ message: "Asset maintenance request not found" });
    }
    res.status(200).json(assetMaintenance);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching asset maintenance request", error: error.message });
  }
};

// UPDATE an existing asset maintenance request
export const updateAssetMaintenance = async (req, res) => {
  try {
    const updatedMaintenance = await AssetMaintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return the updated document
        runValidators: true, // run schema validators on update
      }
    );

    if (!updatedMaintenance) {
      return res
        .status(404)
        .json({ message: "Asset maintenance request not found" });
    }

    res
      .status(200)
      .json({ message: "Asset maintenance request updated successfully", updatedMaintenance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating asset maintenance request", error: error.message });
  }
};

