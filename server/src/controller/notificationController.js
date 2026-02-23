import {
  getMyNotificationsService,
  markNotificationReadService,
  deleteNotificationService,
} from "../services/notificationService.js";

// Get all notifications for user
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await getMyNotificationsService(req.user._id);
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a notification as read
export const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const response = await markNotificationReadService(notificationId, req.user._id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const response = await deleteNotificationService(notificationId, req.user._id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};