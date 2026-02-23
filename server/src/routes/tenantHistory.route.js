import express from "express";
import auth from "../middleware/auth.js";
import { deleteTenantHistory, getTenantHistory } from "../controller/tenantHistoryController.js";
const router = express.Router();

router.get("/", auth, getTenantHistory);
router.delete("/:id", auth, deleteTenantHistory);

export default router;
