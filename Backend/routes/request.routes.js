import express from "express";
import {
  createAssetRequest,
  getAllAssetRequests,
  updateAssetRequestStatus,
 
} from "../controller/assetRequest.controller.js";
import Authenticated from "../middleware/Authmiddleware.js"

const Reqrouter = express.Router();

Reqrouter.post("/createreq",Authenticated,createAssetRequest);

Reqrouter.get("/getreq",Authenticated, getAllAssetRequests);

Reqrouter.put("/updatereq/:id",Authenticated,updateAssetRequestStatus );

export default Reqrouter;
