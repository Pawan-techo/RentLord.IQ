import { api } from "../../config/apiConfig";
import {
  CREATE_PROPERTY_REQUEST,
  CREATE_PROPERTY_SUCCESS,
  CREATE_PROPERTY_FAIL,
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,
  GET_PROPERTY_REQUEST,
  GET_PROPERTY_SUCCESS,
  GET_PROPERTY_FAIL,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAIL,
  RESET_PROPERTY_STATE,
} from "./ActionType";

// Create Property
export const createProperty = (propertyData, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROPERTY_REQUEST });

    const { data } = await api.post("/api/properties", propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: CREATE_PROPERTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PROPERTY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get All Landlord Properties
export const getLandlordProperties = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROPERTIES_REQUEST });

    const { data } = await api.get("/api/properties", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_PROPERTIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROPERTIES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get Property By ID
export const getPropertyById = (propertyId, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROPERTY_REQUEST });

    const { data } = await api.get(`/api/properties/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_PROPERTY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROPERTY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Property
export const deleteProperty = (propertyId, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROPERTY_REQUEST });

    await api.delete(`/api/properties/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: DELETE_PROPERTY_SUCCESS,
      payload: propertyId,
    });

  } catch (error) {
    dispatch({
      type: DELETE_PROPERTY_FAIL,
      payload: error.response?.data?.message || error.message,
    });

    throw error; 
  }
};

// Reset
export const resetPropertyState = () => ({
  type: RESET_PROPERTY_STATE,
});
