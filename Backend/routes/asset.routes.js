import express from "express";
import {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from "../controller/asset.controller.js";

const Assetrouter = express.Router();

Assetrouter.post("/createasset", createAsset); 
Assetrouter.get("/getasset", getAllAssets); 
Assetrouter.get("/getass/:id", getAssetById); 
Assetrouter.put("/updateasset/:id", updateAsset); 
Assetrouter.delete("/deleteasset/:id", deleteAsset); 

export default Assetrouter;
