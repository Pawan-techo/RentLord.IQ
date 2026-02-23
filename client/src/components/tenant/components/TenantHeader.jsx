import { Bell, User, LogOut } from "lucide-react";
import logo from "../../../assets/logo.png";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../state/Auth/Action";
import { useEffect } from "react";
const TenantHeader = ({ tenantName, unreadNotifications = 3, profilePic }) => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    window.location.href = "/";
  };
  
  return (
    <header className="sticky top-0 z-20 bg-white shadow-md shadow-indigo-200">
      <div className="max-w-7xl mx-auto py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-48 mt-2 flex items-center justify-center">
            <img
              src={logo}
              alt="RentLordIQ"
              onClick={() => navigate("/")}
              className="h-16 w-full object-cover cursor-pointer scale-150"
            />
          </div>
        </div>
        <div className="flex items-center gap-4" ref={menuRef}>
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="w-10 h-10 rounded-full bg-indigo-600 border border-indigo-300 text-white flex items-center justify-center font-semibold cursor-pointer overflow-hidden"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              tenantName?.charAt(0)
            )}
          </div>
          {openMenu && (
            <div className="absolute right-4 top-14 w-44 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center gap-2 hover:bg-red-50 text-red-600 text-sm cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
          <div className="relative cursor-pointer">
            <Bell className="w-8 h-8 text-slate-600" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TenantHeader;
