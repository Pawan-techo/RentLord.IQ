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

// Due state management
const initialState = {
  loading: false,
  dues: [],
  alldues: [],
  selectedDue: null,
  error: null,
};

export const dueReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle request states
    case GET_TENANT_DUES_REQUEST:
    case GET_LANDLORD_DUES_REQUEST:
    case GET_DUE_BY_ID_REQUEST:
    case GET_TENANT_DUES_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Store tenant dues
    case GET_TENANT_DUES_SUCCESS:
      return {
        ...state,
        loading: false,
        dues: action.payload.data || action.payload,
      };

    // Store landlord dues
    case GET_LANDLORD_DUES_SUCCESS:
      return {
        ...state,
        loading: false,
        alldues: action.payload.data || action.payload,
      };

    // Store dues by tenant ID
    case GET_TENANT_DUES_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        dues: action.payload.dues,
      };

    // Store single selected due
    case GET_DUE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedDue: action.payload,
      };

    // Handle failure states
    case GET_TENANT_DUES_FAILURE:
    case GET_LANDLORD_DUES_FAILURE:
    case GET_DUE_BY_ID_FAILURE:
    case GET_TENANT_DUES_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};