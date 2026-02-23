import {
  createRentPayment,
  getMyPayments,
  verifyPayment,
} from "../services/paymentService.js";

// Create rent payment (Razorpay order)
export const createRentPaymentController = async (req, res) => {
  try {
    const { userId, referenceId, amount, rentMonth } = req.body;

    if (!userId || !referenceId || !amount || !rentMonth) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const data = await createRentPayment({ userId, referenceId, amount, rentMonth });

    res.status(200).json({ success: true, message: "Payment order created", data });
  } catch (error) {
    console.error("Create rent payment error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create payment" });
  }
};

// Verify payment
export const verifyPaymentController = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay verification data" });
    }

    const result = await verifyPayment({ razorpay_payment_id, razorpay_order_id, razorpay_signature });

    res.status(200).json(result);
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(400).json({ success: false, message: error.message || "Payment verification failed" });
  }
};

// Get user's payments
export const getMyPaymentsController = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const payments = await getMyPayments(userId);
    res.status(200).json({ success: true, message: "Payments fetched successfully", data: payments });
  } catch (error) {
    console.error("Get payments error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch payments" });
  }
};