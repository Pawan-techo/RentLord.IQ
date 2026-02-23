import {
  INVITE_TENANT_REQUEST,
  INVITE_TENANT_SUCCESS,
  INVITE_TENANT_FAIL,
  ACCEPT_INVITE_REQUEST,
  ACCEPT_INVITE_SUCCESS,
  ACCEPT_INVITE_FAIL,
  RESET_INVITATION_STATE,
  GET_INVITATIONS_REQUEST,
  GET_INVITATIONS_SUCCESS,
  GET_INVITATIONS_FAIL,
  INVITE_EXISTING_REQUEST,
  ACCEPT_EXISTING_REQUEST,
  INVITE_EXISTING_SUCCESS,
  ACCEPT_EXISTING_SUCCESS,
  INVITE_EXISTING_FAIL,
  ACCEPT_EXISTING_FAIL,
} from "./ActionType";

// Invitation state management
const initialState = {
  loading: false,
  success: null,
  error: null,
  inviteData: null,
  invitationsBySubProperty: {},
};

export const invitationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle request states
    case INVITE_TENANT_REQUEST:
    case ACCEPT_INVITE_REQUEST:
    case INVITE_EXISTING_REQUEST:
    case ACCEPT_EXISTING_REQUEST:
    case GET_INVITATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    // New tenant invited
    case INVITE_TENANT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        inviteData: action.payload,
      };

    // Invitation accepted with password setup
    case ACCEPT_INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
      };

    // Existing tenant invite/accept success
    case INVITE_EXISTING_SUCCESS:
    case ACCEPT_EXISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        invitation: action.payload,
      };

    // Store invitations grouped by sub-property
    case GET_INVITATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        invitationsBySubProperty: {
          ...state.invitationsBySubProperty,
          [action.payload.subPropertyId]: action.payload.invitation,
        },
        error: null,
      };

    // Handle failure states
    case INVITE_TENANT_FAIL:
    case ACCEPT_INVITE_FAIL:
    case GET_INVITATIONS_FAIL:
    case INVITE_EXISTING_FAIL:
    case ACCEPT_EXISTING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset invitation state
    case RESET_INVITATION_STATE:
      return initialState;

    default:
      return state;
  }
};