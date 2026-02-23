import express from "express";
import {
  createMaintenanceRequestController,
  getMaintenanceRequestsByLandlordController,
  getMaintenanceRequestsByTenant,
  getMaintenanceRequestsByTenantId,
  updateMaintenanceStatusController,
} from "../controller/maintenanceController.js"
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/",auth, createMaintenanceRequestController);

router.get("/tenant",auth,getMaintenanceRequestsByTenant);

router.get("/tenant/:tenantId",auth,getMaintenanceRequestsByTenantId);

router.get("/landlord",auth, getMaintenanceRequestsByLandlordController);

router.patch("/:requestId/status",auth, updateMaintenanceStatusController);

export default router;
