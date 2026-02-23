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

// Initial state for properties
const initialState = {
  loading: false,
  properties: [],
  property: null,
  success: false,
  error: null,
};

// Property reducer
export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    // Requests
    case CREATE_PROPERTY_REQUEST:
    case GET_PROPERTIES_REQUEST:
    case GET_PROPERTY_REQUEST:
    case DELETE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Create property success
    case CREATE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        properties: {
          ...state.properties,
          properties: [...state.properties.properties, action.payload],
        },
      };

    // Get all properties
    case GET_PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.payload,
      };

    // Get single property
    case GET_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        property: action.payload,
      };

    // Delete property
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        properties: {
          ...state.properties,
          properties: state.properties.properties.filter(
            (p) => p._id !== action.payload,
          ),
        },
        loading: false,
      };

    // Failures
    case CREATE_PROPERTY_FAIL:
    case GET_PROPERTIES_FAIL:
    case GET_PROPERTY_FAIL:
    case DELETE_PROPERTY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset state
    case RESET_PROPERTY_STATE:
      return {
        ...initialState,
        properties: [],
      };

    default:
      return state;
  }
};
