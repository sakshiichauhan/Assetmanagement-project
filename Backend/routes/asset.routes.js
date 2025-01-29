import express from "express";
import {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
   
} from "../controller/asset.controller.js";
import Authenticated from "../middleware/Authmiddleware.js";


const assetrouter = express.Router();

assetrouter.post("/createasset", Authenticated ,createAsset); // Admin creates asset
assetrouter.get("/getasset",  getAllAssets); // Get all assets
assetrouter.get("/getasset/:id", getAssetById); // Get asset by ID
assetrouter.put("/updateasset/:id",  updateAsset); // Update asset

export default assetrouter;

