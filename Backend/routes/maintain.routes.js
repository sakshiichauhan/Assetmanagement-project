import express from "express";
import {
  createAssetMaintenance,
  getAllAssetMaintenances,
  updateAssetMaintenance,
} from "../controller/assetMaintain.controller.js";

const Maintenancesrouter = express.Router();

Maintenancesrouter.post("/createmaintain", createAssetMaintenance); 
Maintenancesrouter.get("/getmaintain", getAllAssetMaintenances); 
Maintenancesrouter.put("/updatemaintain/:id", updateAssetMaintenance); 

export default Maintenancesrouter;
