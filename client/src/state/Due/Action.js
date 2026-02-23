import {
  GET_TENANT_DUES_REQUEST,
  GET_TENANT_DUES_SUCCESS,
  GET_TENANT_DUES_FAILURE,
  GET_LANDLORD_DUES_REQUEST,
  GET_LANDLORD_DUES_SUCCESS,
  GET_LANDLORD_DUES_FAILURE,
  GET_DUE_BY_ID_REQUEST,
  GET_DUE_BY_ID_SUCCESS,
  GET_DUE_BY_ID_FAILURE,
  GET_TENANT_DUES_BY_ID_REQUEST,
  GET_TENANT_DUES_BY_ID_SUCCESS,
  GET_TENANT_DUES_BY_ID_FAILURE,
} from "./ActionType";
import { api } from "../../config/apiConfig";

// Fetch dues for logged-in tenant
export const getTenantDues = (token) => async (dispatch) => {
  dispatch({ type: GET_TENANT_DUES_REQUEST });

  try {
    const { data } = await api.get("/api/dues/tenant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_TENANT_DUES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TENANT_DUES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch dues of a specific tenant by ID
export const getTenantDuesById = (tenantId, token) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TENANT_DUES_BY_ID_REQUEST,
    });

    const { data } = await api.get(`/api/dues/tenant/${tenantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_TENANT_DUES_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TENANT_DUES_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch dues for logged-in landlord
export const getLandlordDues = (token) => async (dispatch) => {
  dispatch({ type: GET_LANDLORD_DUES_REQUEST });

  try {
    const { data } = await api.get("/api/dues/landlord", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_LANDLORD_DUES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LANDLORD_DUES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch single due by ID
export const getDueById = (dueId, token) => async (dispatch) => {
  dispatch({ type: GET_DUE_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/dues/${dueId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_DUE_BY_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DUE_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};