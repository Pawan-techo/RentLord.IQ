import { api } from "../../config/apiConfig";
import {
  GET_TENANT_HISTORY_REQUEST,
  GET_TENANT_HISTORY_SUCCESS,
  GET_TENANT_HISTORY_FAILURE,
  DELETE_TENANT_HISTORY_REQUEST,
  DELETE_TENANT_HISTORY_SUCCESS,
  DELETE_TENANT_HISTORY_FAILURE,
} from "./ActionType";

// Get tenant history
export const getTenantHistory = (token) => async (dispatch) => {
  dispatch({ type: GET_TENANT_HISTORY_REQUEST });

  try {
    const { data } = await api.get("/api/tenants-history", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: GET_TENANT_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TENANT_HISTORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete tenant history
export const deleteTenantHistory = (historyId, token) => async (dispatch) => {
  dispatch({ type: DELETE_TENANT_HISTORY_REQUEST });

  try {
    await api.delete(`/api/tenants-history/${historyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: DELETE_TENANT_HISTORY_SUCCESS, payload: historyId });
  } catch (error) {
    dispatch({
      type: DELETE_TENANT_HISTORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};