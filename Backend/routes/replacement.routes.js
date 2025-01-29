import express from "express";
import {
  createAssetReplacement,
  getAllAssetReplacements,
  updateAssetReplacement,
} from "../controller/assetReplacement.controller.js";
import Authenticated from "../middleware/Authmiddleware.js";

const Replacementrouter = express.Router();

Replacementrouter.post("/createreplace",Authenticated, createAssetReplacement);
Replacementrouter.get("/getreplace", getAllAssetReplacements);
Replacementrouter.put("/updatereplace/:id", updateAssetReplacement);

export default Replacementrouter;
