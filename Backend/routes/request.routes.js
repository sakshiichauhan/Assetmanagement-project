import express from "express";
import {
  createAssetRequest,
  getAllAssetRequests,
  updateAssetRequestStatus,
 
} from "../controller/assetRequest.controller.js";

const Reqrouter = express.Router();

Reqrouter.post("/createreq",createAssetRequest);

Reqrouter.get("/getreq",  getAllAssetRequests);

Reqrouter.put("/updatereq/:id", updateAssetRequestStatus );

export default Reqrouter;
