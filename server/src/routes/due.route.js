import express from "express";
import {
  getTenantDues,
  getLandlordDues,
  getDueById,
  getTenantDuesByIdController,
} from "../controller/dueController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/tenant", auth, getTenantDues);
router.get("/landlord", auth, getLandlordDues);
router.get("/:dueId", auth, getDueById);
router.get("/tenant/:tenantId", auth, getTenantDuesByIdController);

export default router;
