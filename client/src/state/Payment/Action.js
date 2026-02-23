import { api } from "../../config/apiConfig";
import {
  CREATE_RENT_PAYMENT_REQUEST,
  CREATE_RENT_PAYMENT_SUCCESS,
  CREATE_RENT_PAYMENT_FAIL,
  VERIFY_RENT_PAYMENT_REQUEST,
  VERIFY_RENT_PAYMENT_SUCCESS,
  VERIFY_RENT_PAYMENT_FAIL,
  RESET_RENT_PAYMENT,
  GET_PAYMENTS_FAIL,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
} from "./ActionType";

// Create Razorpay Order
export const createRentPayment = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_RENT_PAYMENT_REQUEST });

    const { data } = await api.post("/api/payments/create", paymentData);

    dispatch({
      type: CREATE_RENT_PAYMENT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_RENT_PAYMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Verify Razorpay Payment
export const verifyRentPayment = (verifyData) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_RENT_PAYMENT_REQUEST });

    const { data } = await api.post("/api/payments/verify", verifyData);

    dispatch({
      type: VERIFY_RENT_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_RENT_PAYMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// View my payments
export const getMyPayments = (token) => async (dispatch) => {
  dispatch({ type: GET_PAYMENTS_REQUEST });

  try {
    const { data } = await api.get("/api/payments/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_PAYMENTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMENTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Reset State
export const resetRentPayment = () => ({
  type: RESET_RENT_PAYMENT,
});


