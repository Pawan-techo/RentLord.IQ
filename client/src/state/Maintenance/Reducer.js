import {
  CREATE_MAINTENANCE_REQUEST,
  CREATE_MAINTENANCE_SUCCESS,
  CREATE_MAINTENANCE_FAILURE,
  GET_TENANT_MAINTENANCE_REQUEST,
  GET_TENANT_MAINTENANCE_SUCCESS,
  GET_TENANT_MAINTENANCE_FAILURE,
  GET_LANDLORD_MAINTENANCE_REQUEST,
  GET_LANDLORD_MAINTENANCE_SUCCESS,
  GET_LANDLORD_MAINTENANCE_FAILURE,
  UPDATE_MAINTENANCE_STATUS_REQUEST,
  UPDATE_MAINTENANCE_STATUS_SUCCESS,
  UPDATE_MAINTENANCE_STATUS_FAILURE,
  GET_TENANTID_MAINTENANCE_REQUEST,
  GET_TENANTID_MAINTENANCE_SUCCESS,
  GET_TENANTID_MAINTENANCE_FAILURE,
} from "./ActionType";

// Initial state for maintenance module
const initialState = {
  tenantRequests: [],
  landlordRequests: [],
  loading: false,
  error: null,
};

// Handles tenant and landlord maintenance related actions
export const maintenanceReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request state (loading start)
    case CREATE_MAINTENANCE_REQUEST:
    case GET_TENANT_MAINTENANCE_REQUEST:
    case GET_TENANTID_MAINTENANCE_REQUEST:
    case GET_LANDLORD_MAINTENANCE_REQUEST:
    case UPDATE_MAINTENANCE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Add newly created maintenance request to tenant list
    case CREATE_MAINTENANCE_SUCCESS:
      return {
        ...state,
        tenantRequests: [action.payload, ...state.tenantRequests],
        loading: false,
      };

    // Set tenant maintenance requests
    case GET_TENANT_MAINTENANCE_SUCCESS:
      return {
        ...state,
        tenantRequests: action.payload,
        loading: false,
      };

    // Set tenant maintenance requests by tenant ID
    case GET_TENANTID_MAINTENANCE_SUCCESS:
      return {
        ...state,
        tenantRequests: action.payload,
        loading: false,
      };

    // Set landlord maintenance requests
    case GET_LANDLORD_MAINTENANCE_SUCCESS:
      return {
        ...state,
        landlordRequests: action.payload,
        loading: false,
      };

    // Update maintenance request status in landlord list
    case UPDATE_MAINTENANCE_STATUS_SUCCESS:
      return {
        ...state,
        landlordRequests: state.landlordRequests.map((req) =>
          req._id === action.payload._id ? action.payload : req,
        ),
        loading: false,
      };

    // Failure state
    case CREATE_MAINTENANCE_FAILURE:
    case GET_TENANT_MAINTENANCE_FAILURE:
    case GET_TENANTID_MAINTENANCE_FAILURE:
    case GET_LANDLORD_MAINTENANCE_FAILURE:
    case UPDATE_MAINTENANCE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};