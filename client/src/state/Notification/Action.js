import { api } from "../../config/apiConfig";
import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  MARK_NOTIFICATION_READ_REQUEST,
  MARK_NOTIFICATION_READ_SUCCESS,
  MARK_NOTIFICATION_READ_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
} from "./ActionType";

// Fetch all notifications
export const getNotifications = (token) => async (dispatch) => {
  dispatch({ type: GET_NOTIFICATIONS_REQUEST });
  try {
    const { data } = await api.get("/api/notifications/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATIONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Mark notification as read
export const markNotificationAsRead =
  (notificationId, token) => async (dispatch) => {
    dispatch({ type: MARK_NOTIFICATION_READ_REQUEST });

    try {
      const { data } = await api.patch(
        `/api/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({
        type: MARK_NOTIFICATION_READ_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MARK_NOTIFICATION_READ_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Delete notification
export const deleteNotification =
  (notificationId, token) => async (dispatch) => {
    dispatch({ type: DELETE_NOTIFICATION_REQUEST });

    try {
      await api.delete(`/api/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: DELETE_NOTIFICATION_SUCCESS,
        payload: notificationId,
      });
    } catch (error) {
      dispatch({
        type: DELETE_NOTIFICATION_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };