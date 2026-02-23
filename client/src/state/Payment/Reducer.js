import {
  CREATE_RENT_PAYMENT_REQUEST,
  CREATE_RENT_PAYMENT_SUCCESS,
  CREATE_RENT_PAYMENT_FAIL,
  VERIFY_RENT_PAYMENT_REQUEST,
  VERIFY_RENT_PAYMENT_SUCCESS,
  VERIFY_RENT_PAYMENT_FAIL,
  RESET_RENT_PAYMENT,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAIL,
} from "./ActionType";

// Initial payment state
const initialState = {
  loading: false,
  order: null,
  verified: false,
  payments: [],
  success: false,
  error: null,
};

// Handles rent payment actions
export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {

    // Start loading
    case CREATE_RENT_PAYMENT_REQUEST:
    case VERIFY_RENT_PAYMENT_REQUEST:
    case GET_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Payment order created
    case CREATE_RENT_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        success: true,
      };

    // Payment verified
    case VERIFY_RENT_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        verified: true,
        success: true,
      };

    // Set payment history
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload,
      };

    // Failure cases
    case CREATE_RENT_PAYMENT_FAIL:
    case VERIFY_RENT_PAYMENT_FAIL:
    case GET_PAYMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset payment state
    case RESET_RENT_PAYMENT:
      return {
        ...initialState,
        payments: [],
      }

    default:
      return state;
  }
};