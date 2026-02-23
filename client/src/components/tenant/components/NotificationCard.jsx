import { useDispatch, useSelector } from "react-redux";
import { Trash2, Check } from "lucide-react";
import {
  deleteNotification as deleteNotificationAction,
  markNotificationAsRead,
} from "../../../state/Notification/Action";


const NotificationCard = ({ notifications = [] }) => {
  const dispatch = useDispatch();
const { jwt } =useSelector((state)=>state.auth);
  const markAsRead = (id) => {
    dispatch(markNotificationAsRead(id,jwt));
  };

  const handleDelete = (id) => {
    dispatch(deleteNotificationAction(id,jwt));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[212px] flex flex-col">
      <div className="px-4 py-1 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">
          Notifications
        </h3>
        <span className="text-sm text-slate-500">
          {notifications.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.length === 0 ? (
          <p className="text-sm text-slate-500 text-center">
            No notifications 🎉
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`rounded-xl p-4 flex justify-between gap-4 border transition ${
                notification.isRead
                  ? "bg-white border-gray-200 opacity-70"
                  : "bg-indigo-50 border-indigo-200"
              }`}
            >
              <div className="flex-1">
                <h3 className="text-slate-800 font-semibold text-sm">
                  {notification.type}
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-green-50 text-green-700 hover:bg-green-100"
                  >
                    <Check className="w-3 h-3" />
                    Read
                  </button>
                )}

                <button
                  onClick={() => handleDelete(notification._id)}
                  className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default NotificationCard;
