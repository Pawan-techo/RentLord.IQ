import {
  LayoutDashboard,
  Building2,
  Home,
  User,
  Users,
  Clock,
  Wrench,
  Bell,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logout } from "../../state/Auth/Action";
import { useDispatch } from "react-redux";

const navItems = [
  { name: "Insights", icon: LayoutDashboard, path: "/landlord/insights" },
  { name: "Properties", icon: Building2, path: "/landlord/properties" },
  { name: "Sub Properties", icon: Home, path: "/landlord/sub-properties" },
  { name: "Tenant History", icon: Users, path: "/landlord/tenants" },
  { name: "Due Rent", icon: Clock, path: "/landlord/due" },
  { name: "Maintenance", icon: Wrench, path: "/landlord/maintenance" },
  { name: "Notifications", icon: Bell, path: "/landlord/notifications" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Clears auth state and redirects to landing page
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-100 h-screen w-64
          bg-gradient-to-b from-slate-50 to-white
          shadow-md shadow-indigo-200 border border-gray-200
          flex flex-col
          transition-transform duration-300 ease-in-out
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="h-16 flex items-center justify-between px-6">
          <div className="h-14 flex items-center justify-center mt-10 border-b border-gray-300">
            <img
              src={logo}
              alt="RentLordIQ Logo"
              className="object-contain scale-150"
            />
          </div>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active route indicator */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full transition
                    ${
                      isActive
                        ? "bg-indigo-600"
                        : "opacity-0 group-hover:opacity-30 bg-slate-400"
                    }`}
                  />

                  <item.icon size={18} />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mb-10 md:mb-0">
          <button
            onClick={() => navigate("my-account")}
            className="group flex items-center gap-3 w-full px-4 py-3 text-sm font-medium
            text-slate-500 hover:text-white rounded-xl transition hover:bg-gray-500 shadow cursor-pointer"
          >
            <User size={18} />
            My Account
          </button>

          <button
            onClick={() => handleLogout()}
            className="group flex items-center gap-3 w-full px-4 py-3 text-sm font-medium
            text-red-400 hover:text-white rounded-xl transition hover:bg-red-500 shadow cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;