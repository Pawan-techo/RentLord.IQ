import { api } from "../../config/apiConfig";
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
  INVITE_EXISTING_SUCCESS,
  INVITE_EXISTING_FAIL,
  ACCEPT_EXISTING_REQUEST,
  ACCEPT_EXISTING_SUCCESS,
  ACCEPT_EXISTING_FAIL,
} from "./ActionType";

// Invite new tenant via email
export const inviteTenant = (inviteData, token) => async (dispatch) => {
  try {
    dispatch({ type: INVITE_TENANT_REQUEST });

    const { data } = await api.post("/api/invitations/invite", inviteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: INVITE_TENANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVITE_TENANT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Accept invitation and set password
export const acceptInviteSetPassword = (payload) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_INVITE_REQUEST });

    const { data } = await api.post("/api/invitations/accept", payload);

    dispatch({
      type: ACCEPT_INVITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCEPT_INVITE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Invite existing registered tenant
export const inviteExistingTenant =
  ({ email, subPropertyId }, jwt) =>
  async (dispatch) => {
    try {
      dispatch({ type: INVITE_EXISTING_REQUEST });

      const { data } = await api.post(
        "/api/invitations/invite-existing",
        { email, subPropertyId },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: INVITE_EXISTING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INVITE_EXISTING_FAIL,
        payload:
          error.response?.data?.message || error.message,
      });
    }
  };

// Accept invitation for existing tenant
export const acceptExistingTenant =
  (token) => async (dispatch) => {
    try {
      dispatch({ type: ACCEPT_EXISTING_REQUEST });

      const { data } = await api.post(
        "/api/invitations/accept-existing",
        { token }
      );

      dispatch({
        type: ACCEPT_EXISTING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCEPT_EXISTING_FAIL,
        payload:
          error.response?.data?.message || error.message,
      });
    }
  };

// Get invitations for a specific sub-property
export const getInvitationsBySubProperty =
  (subPropertyId, token) => async (dispatch) => {
    try {
      dispatch({ type: GET_INVITATIONS_REQUEST });

      const { data } = await api.get(
        `/api/invitations/subproperty/${subPropertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_INVITATIONS_SUCCESS,
        payload: {
          subPropertyId,
          invitation: data.invitation,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_INVITATIONS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Reset invitation-related state
export const resetInvitationState = () => ({
  type: RESET_INVITATION_STATE,
});