import express from "express";
import {
  createAssetRequest,
  getAllAssetRequests,
  updateAssetRequestStatus,
} from "../controller/assetRequest.controller.js";

const requestrouter = express.Router();

requestrouter.post("/createreq-asset", createAssetRequest); 
requestrouter.get("/getreq/", getAllAssetRequests); 
requestrouter.put("/updatereq/:id", updateAssetRequestStatus); 

export default requestrouter;
