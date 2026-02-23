import { useState } from "react";
import DashboardHeader from "../DashboardHeader";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, markNotificationAsRead } from "../../../state/Notification/Action";

const Notifications = () => {
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);

  // Dispatch actions with JWT authentication
  const markAsRead = (id) => {
    dispatch(markNotificationAsRead(id, jwt));
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id, jwt));
  };

  // Mapping notification types to badge styles
  const typeColors = {
    RENT: "bg-green-50 text-green-700 border border-green-300",
    MAINTENANCE: "bg-orange-50 text-orange-700 border border-orange-300",
    TENANT: "bg-blue-50 text-blue-700 border border-blue-300",
    PROPERTY: "bg-purple-50 text-purple-700 border border-purple-300",
    SUBSCRIPTION: "bg-indigo-50 text-indigo-700 border border-indigo-300",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader title="Notifications" />

      <div className="p-6 w-full mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-scroll md:overflow-hidden">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              🎉 You’re all caught up!
            </div>
          ) : (
            <table className="w-full text-sm divide-y divide-slate-200">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-14 py-4 text-left font-medium">Type</th>
                  <th className="px-20 py-4 text-left font-medium">Message</th>
                  <th className="px-10 py-4 text-left font-medium">Time</th>
                  <th className="px-6 py-4 text-center font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {notifications.map((n,index) => (
                  <tr
                    key={n.id || index}
                    className={`hover:bg-slate-50 transition ${
                      !n.isRead ? "bg-indigo-50/30" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-6">
                      <span
                        className={`px-2 py-1 text-xs font-semibold ${
                          typeColors[n.type] || "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {n.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {n.message}
                    </td>

                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {n.time}
                    </td>

                    <td className="px-6 py-4 flex justify-center gap-4">
                      {!n.isRead ? (
                        <button
                          onClick={() => markAsRead(n._id)}
                          className="px-3 py-1.5 border border-indigo-800 text-indigo-800 hover:bg-indigo-600 hover:text-white rounded transition"
                        >
                          Mark as Read
                        </button>
                      ) : (
                        <span className="px-5 w-31 py-1.5 border border-gray-400 text-gray-400 rounded">
                          Already Read
                        </span>
                      )}

                      <button
                        onClick={() => handleDelete(n._id)}
                        className="px-3 py-1.5 border border-red-800 text-red-800 rounded hover:bg-red-600 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;