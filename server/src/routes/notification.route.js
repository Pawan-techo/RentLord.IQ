import express from "express";
import {
  getMyNotifications,
  markNotificationRead,
  deleteNotification,
} from "../controller/notificationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getMyNotifications);
router.patch("/:notificationId/read", auth, markNotificationRead);
router.delete("/:notificationId", auth, deleteNotification);

export default router;
