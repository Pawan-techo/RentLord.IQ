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

// Initial state
const initialState = {
  loading: false,
  tenantSubProperty: null,
  subProperties: [],
  success: false,
  error: null,
};

// Reducer
export const subPropertyReducer = (state = initialState, action) => {
  switch (action.type) {

    // Requests
    case CREATE_SUBPROPERTY_REQUEST:
    case GET_SUBPROPERTIES_BY_PROPERTY_REQUEST:
    case GET_SUBPROPERTIES_BY_LANDLORD_REQUEST:
    case DELETE_SUBPROPERTY_REQUEST:
    case VACATE_SUBPROPERTY_REQUEST:
    case GET_SUBPROPERTY_BY_CURRENT_TENANT_REQUEST:
      return { ...state, loading: true, error: null };

    // Create subproperty
    case CREATE_SUBPROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        subProperties: {
          ...state.subProperties,
          data: [...state.subProperties.data, action.payload],
          count: state.subProperties.count + 1,
        },
      };

    // Get subproperties
    case GET_SUBPROPERTIES_BY_PROPERTY_SUCCESS:
    case GET_SUBPROPERTIES_BY_LANDLORD_SUCCESS:
      return { ...state, loading: false, subProperties: action.payload || [] };

    // Get tenant's current subproperty
    case GET_SUBPROPERTY_BY_CURRENT_TENANT_SUCCESS:
      return { ...state, loading: false, tenantSubProperty: action.payload };

    // Vacate subproperty
    case VACATE_SUBPROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        subProperties: state.subProperties.map((item) =>
          item._id?.toString() === action.payload?._id?.toString()
            ? { ...action.payload }
            : item,
        ),
      };

    // Delete subproperty
    case DELETE_SUBPROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        subProperties: {
          ...state.subProperties,
          data: state.subProperties.data.filter(
            (sp) => sp._id !== action.payload,
          ),
          count: state.subProperties.count - 1,
        },
      };

    // Failures
    case CREATE_SUBPROPERTY_FAIL:
    case GET_SUBPROPERTIES_BY_PROPERTY_FAIL:
    case GET_SUBPROPERTIES_BY_LANDLORD_FAIL:
    case DELETE_SUBPROPERTY_FAIL:
    case VACATE_SUBPROPERTY_FAIL:
    case GET_SUBPROPERTY_BY_CURRENT_TENANT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Reset state
    case RESET_SUBPROPERTY_STATE:
      return initialState;

    default:
      return state;
  }
};