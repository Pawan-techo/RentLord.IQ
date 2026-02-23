import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_MY_TENANTS_REQUEST,
  GET_MY_TENANTS_SUCCESS,
  GET_MY_TENANTS_FAILURE,
  GET_MY_LANDLORD_REQUEST,
  GET_MY_LANDLORD_SUCCESS,
  GET_MY_LANDLORD_FAILURE,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  UPDATE_PROFILE_IMAGE_FAILURE,
} from "./ActionType";

const savedUser = JSON.parse(localStorage.getItem("user"));
const savedJwt = localStorage.getItem("jwt");

// Initial auth state (restored from localStorage if available)
const initialState = {
  user: savedUser || null,
  users: [],
  tenants: [],
  landlord: null,
  jwt: savedJwt || null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle all request states
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case GET_ALL_USERS_REQUEST:
    case GET_MY_TENANTS_REQUEST:
    case GET_MY_LANDLORD_REQUEST:
    case UPDATE_SUBSCRIPTION_REQUEST:
    case UPDATE_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    // Handle authentication success
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload.jwt,
        error: null,
      };

    // Store logged-in user profile
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };

    // Store all users (admin)
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        error: null,
      };

    // Store landlord tenants
    case GET_MY_TENANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tenants: action.payload,
        error: null,
      };

    // Store tenant's landlord
    case GET_MY_LANDLORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        landlord: action.payload,
        error: null,
      };

    // Update subscription or profile image
    case UPDATE_SUBSCRIPTION_SUCCESS:
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };

    // Handle all failure states
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case GET_ALL_USERS_FAILURE:
    case GET_MY_TENANTS_FAILURE:
    case GET_MY_LANDLORD_FAILURE:
    case UPDATE_SUBSCRIPTION_FAILURE:
    case UPDATE_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Clear state on logout
    case LOGOUT:
      localStorage.clear();
      return {
        ...initialState,
        user: null,
        jwt: null,
        users: [],
        tenants: [],
        landlord: null,
      };

    default:
      return state;
  }
};