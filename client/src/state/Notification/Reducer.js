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

// Initial notification state
const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

// Handles notification actions
export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch notifications
    case GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload.notifications || [],
        loading: false,
      };

    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Mark read or delete request
    case MARK_NOTIFICATION_READ_REQUEST:
    case DELETE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Update notification as read
    case MARK_NOTIFICATION_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification._id === action.payload._id
            ? action.payload
            : notification,
        ),
        loading: false,
      };

    // Remove deleted notification
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n._id !== action.payload,
        ),
      };

    // Failure cases
    case MARK_NOTIFICATION_READ_FAILURE:
    case DELETE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};