import express from "express";
import employeerouter from "./employee.routes.js";
import Assetrouter from "./asset.routes.js";
import requestrouter  from "./request.routes.js";
import Maintenancesrouter from "./maintain.routes.js";
import userRouter from "./user.routes.js";
import Replacementrouter from "./replacement.routes.js";

const router = express.Router();

router.use("/Employee/", employeerouter);
router.use("/Asset/", Assetrouter);
router.use("/AssetReplacement/", Replacementrouter);
router.use("/AssetRequest/", requestrouter);
router.use("/AssetMaintenance/", Maintenancesrouter);
router.use("/User/", userRouter);
export default router;
