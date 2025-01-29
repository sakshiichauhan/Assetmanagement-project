import express from "express";
import {
  createAssetMaintenance,
  getAllAssetMaintenance,
  getAssetMaintenanceById,
  updateAssetMaintenance,
} from "../controller/assetMaintain.controller.js";
import Authenticated from "../middleware/Authmiddleware.js";

const Maintainancerouter = express.Router();

Maintainancerouter.post("/createmain", Authenticated, createAssetMaintenance);
Maintainancerouter.get("/getmain", getAllAssetMaintenance);
Maintainancerouter.get("/getmain/:id", getAssetMaintenanceById);
Maintainancerouter.put("/updatemain/:id", updateAssetMaintenance);

export default Maintainancerouter;
