import { api } from "../../config/apiConfig";
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

// Create maintenance request (Tenant)
export const createMaintenanceRequest = (payload, token) => async (dispatch) => {
  dispatch({ type: CREATE_MAINTENANCE_REQUEST });

  try {
    const { data } = await api.post("/api/maintenance", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: CREATE_MAINTENANCE_SUCCESS,
      payload: data.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: CREATE_MAINTENANCE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get maintenance requests for logged-in tenant
export const getTenantMaintenanceRequests = (token) => async (dispatch) => {
  dispatch({ type: GET_TENANT_MAINTENANCE_REQUEST });

  try {
    const { data } = await api.get("/api/maintenance/tenant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_TENANT_MAINTENANCE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TENANT_MAINTENANCE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get maintenance requests by tenant ID (Landlord view)
export const getTenantMaintenanceByIdRequests =(tenantId, token) => async (dispatch) => {
    try {
      dispatch({
        type: GET_TENANTID_MAINTENANCE_REQUEST,
      }); 

      const { data } = await api.get(
        `/api/maintenance/tenant/${tenantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: GET_TENANTID_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TENANTID_MAINTENANCE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Get maintenance requests for landlord
export const getLandlordMaintenanceRequests = (token) => async (dispatch) => {
  dispatch({ type: GET_LANDLORD_MAINTENANCE_REQUEST });

  try {
    const { data } = await api.get("/api/maintenance/landlord", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_LANDLORD_MAINTENANCE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LANDLORD_MAINTENANCE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update maintenance request status (Landlord)
export const updateMaintenanceStatus =
  (requestId, status, token) => async (dispatch) => {
    dispatch({ type: UPDATE_MAINTENANCE_STATUS_REQUEST });

    try {
      const { data } = await api.patch(
        `/api/maintenance/${requestId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_MAINTENANCE_STATUS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_MAINTENANCE_STATUS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };