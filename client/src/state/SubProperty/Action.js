import { api } from "../../config/apiConfig";
import {
  CREATE_SUBPROPERTY_REQUEST,
  CREATE_SUBPROPERTY_SUCCESS,
  CREATE_SUBPROPERTY_FAIL,
  GET_SUBPROPERTIES_BY_PROPERTY_REQUEST,
  GET_SUBPROPERTIES_BY_PROPERTY_SUCCESS,
  GET_SUBPROPERTIES_BY_PROPERTY_FAIL,
  GET_SUBPROPERTIES_BY_LANDLORD_REQUEST,
  GET_SUBPROPERTIES_BY_LANDLORD_SUCCESS,
  GET_SUBPROPERTIES_BY_LANDLORD_FAIL,
  DELETE_SUBPROPERTY_REQUEST,
  DELETE_SUBPROPERTY_SUCCESS,
  DELETE_SUBPROPERTY_FAIL,
  RESET_SUBPROPERTY_STATE,
  VACATE_SUBPROPERTY_REQUEST,
  VACATE_SUBPROPERTY_SUCCESS,
  VACATE_SUBPROPERTY_FAIL,
  GET_SUBPROPERTY_BY_CURRENT_TENANT_REQUEST,
  GET_SUBPROPERTY_BY_CURRENT_TENANT_SUCCESS,
  GET_SUBPROPERTY_BY_CURRENT_TENANT_FAIL,
} from "./ActionType";

// CREATE SUB-PROPERTY
export const createSubProperty =
  (subPropertyData, token) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SUBPROPERTY_REQUEST });

      const { data } = await api.post("/api/sub-properties", subPropertyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: CREATE_SUBPROPERTY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SUBPROPERTY_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// GET SUB-PROPERTIES BY PROPERTY
export const getSubPropertiesByProperty =
  (propertyId, token) => async (dispatch) => {
    try {
      dispatch({ type: GET_SUBPROPERTIES_BY_PROPERTY_REQUEST });

      const { data } = await api.get(
        `/api/properties/${propertyId}/sub-properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: GET_SUBPROPERTIES_BY_PROPERTY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBPROPERTIES_BY_PROPERTY_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// GET SUB-PROPERTIES BY LANDLORD (FILTERS)
export const getSubPropertiesByLandlord =
  (filters, token) => async (dispatch) => {
    try {
      dispatch({ type: GET_SUBPROPERTIES_BY_LANDLORD_REQUEST });
      const { data } = await api.get("/api/sub-properties/landlord", {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_SUBPROPERTIES_BY_LANDLORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBPROPERTIES_BY_LANDLORD_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const getSubPropertyByCurrentTenant =(tenantId, token) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SUBPROPERTY_BY_CURRENT_TENANT_REQUEST,
      }); 

      const { data } = await api.get(
        `/api/sub-properties/tenant/${tenantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: GET_SUBPROPERTY_BY_CURRENT_TENANT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBPROPERTY_BY_CURRENT_TENANT_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// DELETE SUB-PROPERTY
export const deleteSubProperty = (subPropertyId, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUBPROPERTY_REQUEST });

    await api.delete(`/api/sub-properties/${subPropertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: DELETE_SUBPROPERTY_SUCCESS,
      payload: subPropertyId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SUBPROPERTY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// VACATE SUB-PROPERTY
export const vacateSubProperty =
  (subPropertyId, reasonForLeaving, token) => async (dispatch) => {
    try {
      dispatch({ type: VACATE_SUBPROPERTY_REQUEST });

      const { data } = await api.put(
        `/api/sub-properties/${subPropertyId}/vacate`,
        { reasonForLeaving },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: VACATE_SUBPROPERTY_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: VACATE_SUBPROPERTY_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// RESET
export const resetSubPropertyState = () => ({
  type: RESET_SUBPROPERTY_STATE,
});
