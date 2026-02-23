// Tenant history reducer
import {
  DELETE_TENANT_HISTORY_FAILURE,
  DELETE_TENANT_HISTORY_REQUEST,
  DELETE_TENANT_HISTORY_SUCCESS,
  GET_TENANT_HISTORY_FAILURE,
  GET_TENANT_HISTORY_REQUEST,
  GET_TENANT_HISTORY_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  histories: [],
  error: null,
};

const tenantHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch histories
    case GET_TENANT_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_TENANT_HISTORY_SUCCESS:
      return { ...state, loading: false, histories: action.payload };

    case GET_TENANT_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete history
    case DELETE_TENANT_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };

    case DELETE_TENANT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        histories: state.histories.filter(
          (history) => history._id !== action.payload,
        ),
      };

    case DELETE_TENANT_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default tenantHistoryReducer;
