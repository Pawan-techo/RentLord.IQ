import express from "express";
import auth from "../middleware/auth.js";
import { getMyLandlord, getMyTenants } from "../controller/userController.js";

const router = express.Router();

router.get("/my-tenants", auth, getMyTenants);
router.get("/my-landlord", auth, getMyLandlord);

export default router;
