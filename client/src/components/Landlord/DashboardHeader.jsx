import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../../state/Notification/Action";

const DashboardHeader = ({ title }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user, jwt } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const navigate = useNavigate();

  // Fetch notifications when JWT becomes available
  useEffect(() => {
    if (!jwt) return;
    dispatch(getNotifications(jwt));
  }, [jwt]);

  const unread = notifications.filter((n) => !n.isRead);

  return (
    <header
      className="
        sticky top-0 z-30
        h-16 px-6
        flex items-center justify-between
        bg-gradient-to-b from-slate-50 to-white
        shadow-md shadow-indigo-200 border border-gray-200
      "
    >
      <div>
        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Overview & quick actions
        </p>
      </div>

      <div className="flex items-center gap-5">
        <span className="hidden sm:block text-sm text-slate-600">
          Hi,{" "}
          <span className="font-medium text-slate-800">
            {user?.firstName} {user?.lastName}
          </span>{" "}
          👋
        </span>

        {/* Notification dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative p-2 rounded-full hover:bg-slate-100 transition"
          >
            <Bell className="w-5 h-5 text-slate-700" />

            {unread.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                {unread.length}
              </span>
            )}
          </button>

          {open && (
            <div
              className="
                absolute right-0 mt-3 w-70 md:w-80 
                bg-white rounded-lg shadow-md shadow-indigo-200
                border border-gray-200
                overflow-hidden
              "
            >
              <div className="px-4 py-3 flex items-center justify-between text-sm font-semibold text-slate-700 border-b border-indigo-300">
                <span>Notifications</span>

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/landlord/notifications");
                  }}
                  className="text-xs font-medium text-indigo-600 hover:underline"
                >
                  View all →
                </button>
              </div>

              <ul className="max-h-72 bg-slate-50 overflow-y-auto divide-y divide-gray-200">
                {unread.length === 0 ? (
                  <li className="px-4 py-4 text-sm text-slate-500 text-center">
                    No new notifications 🎉
                  </li>
                ) : (
                  unread.map((n) => (
                    <li
                      key={n.id}
                      className="px-4 py-3 hover:bg-slate-200 cursor-pointer"
                    >
                      <p className="text-sm text-slate-800">{n.message}</p>
                      <span className="text-xs text-slate-400">{n.time}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-indigo-600 border border-indigo-300 text-white flex items-center justify-center font-semibold cursor-pointer overflow-hidden">
            {user ? (
              <img
                src={user?.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              user?.firstName?.charAt(0)
            )}
          </div>

          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;