import {
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_IMAGE_FAILURE,
} from "../actions/userActionTypes";

// Initial auth state
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Handles subscription & profile image updates
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // Start subscription update
    case UPDATE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Subscription update success
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    // Subscription update fail
    case UPDATE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Start profile image update
    case UPDATE_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Profile image update success
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    // Profile image update fail
    case UPDATE_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};