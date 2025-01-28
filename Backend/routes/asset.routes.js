import express from "express";
import {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
    assignAsset,
} from "../controller/asset.controller.js";


const assetrouter = express.Router();

assetrouter.post("/createasset", createAsset); // Admin creates asset
assetrouter.get("/getasset",  getAllAssets); // Get all assets
assetrouter.get("/getasset/:id", getAssetById); // Get asset by ID
assetrouter.put("/updateasset/:id",  updateAsset); // Update asset
assetrouter.delete("/deleteasset/:id",  deleteAsset); // Delete asset
assetrouter.post("/assignssset", assignAsset);
export default assetrouter;

