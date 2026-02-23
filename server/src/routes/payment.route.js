import express from "express";
import {
  createRentPaymentController,
  getMyPaymentsController,
  verifyPaymentController,
} from "../controller/paymentController.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/create", createRentPaymentController);
router.post("/verify", verifyPaymentController);
router.get("/my", auth, getMyPaymentsController);
export default router;
