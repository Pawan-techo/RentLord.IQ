import Notification from "../models/Notification_Model.js";

// Get all notifications for a user
export const getMyNotificationsService = async (userId) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};

// Mark a notification as read
export const markNotificationReadService = async (notificationId, userId) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });
  if (!notification) throw new Error("Notification not found");

  notification.isRead = true;
  await notification.save();

  return notification;
};

// Delete a notification
export const deleteNotificationService = async (notificationId, userId) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });
  if (!notification) throw new Error("Notification not found");

  await Notification.findByIdAndDelete(notificationId);
  return notificationId;
};
