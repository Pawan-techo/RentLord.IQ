import express from "express";
import auth from "../middleware/auth.js";
import { getAllUser, getUserProfile, updateProfileImageController, updateSubscriptionController } from "../controller/userController.js";
const router=express.Router();

router.get("/profile", getUserProfile);
router.get("/", getAllUser);

router.put("/subscription",auth, updateSubscriptionController);

router.put("/profile-image",auth, updateProfileImageController);

export default router;