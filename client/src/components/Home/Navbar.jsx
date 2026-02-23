import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/Auth/Action";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {user,jwt} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const registerRef = useRef(null);
  const userMenuRef = useRef(null);
  const closeMobileMenu = () => {
    setOpen(false);
    setRegisterOpen(false);
    setUserMenuOpen(false);
  };
const handleLogout = () => {
    dispatch(logout());
     window.location.href = "/";
  };
  const scrollToSection = (id) => {
    navigate("/", {
      state: { scrollTo: id },
    });
    closeMobileMenu();
  };
  // 🔐 AUTH STATE (replace later with context / redux / JWT)
  useEffect(()=>{
    if(jwt){
      setIsLoggedIn(true)
    }
  })
  const userName = user?.firstName || "User";
  const navigate = useNavigate();
  const userInitial = userName?.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setRegisterOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full shadow-md shadow-indigo-200 bg-gradient-to-r to-sky-50 via-white from-rose-50 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-16 w-48 mt-2 flex items-center justify-center">
              <img
                src={logo}
                alt="RentLordIQ"
                onClick={() => navigate("/")}
                className="h-16 w-full object-cover cursor-pointer scale-150"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="nav-link"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("solutions")}
              className="nav-link"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="nav-link"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("resources")}
              className="nav-link"
            >
              Resources
            </button>
            <button
              onClick={() => scrollToSection("finalcta")}
              className="nav-link"
            >
              Contact
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 relative">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-700 hover:text-indigo-800 font-medium cursor-pointer"
                >
                  Login
                </button>

                {/* Register Dropdown */}
                <div className="relative" ref={registerRef}>
                  <button
                    onClick={() => setRegisterOpen(!registerOpen)}
                    className="px-4 py-2 rounded-lg border border-indigo-800 text-indigo-800 hover:bg-indigo-50 font-medium cursor-pointer"
                  >
                    Register
                  </button>

                  {registerOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg shadow-indigo-200 rounded-sm border border-gray-300 z-50">
                      <button
                        onClick={() => {
                          navigate("/register/landlord");
                          closeMobileMenu();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-indigo-200 rounded-t-xl cursor-pointer"
                      >
                        As Landlord
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate("/book-demo")}
                  className="px-4 py-2 rounded-lg bg-indigo-700 text-white hover:bg-indigo-700 font-medium shadow cursor-pointer"
                >
                  Book Demo
                </button>
              </>
            ) : (
              /* Avatar Menu */
              <div className="relative" ref={userMenuRef}>
                <div
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="h-10 w-10 rounded-full bg-indigo-700 text-white flex items-center justify-center font-semibold cursor-pointer"
                >
                  {userInitial}
                </div>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg shadow-indigo-200 rounded-sm border border-gray-300 z-50">
                    <button
                      onClick={() => {
                        navigate("/landlord/");
                        closeMobileMenu();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-indigo-200 rounded-t-xl cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate("/landlord/my-account");
                        closeMobileMenu();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-indigo-200 rounded-t-xl cursor-pointer"
                    >
                      Manage Account
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 border-b border-indigo-200 rounded-t-xl cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden bg-white border-t border-gray-200"
          ref={registerRef}
        >
          <div className="px-6 py-6 space-y-5">
            <a
              onClick={() => scrollToSection("features")}
              className="mobile-link"
            >
              Features
            </a>
            <a
              onClick={() => scrollToSection("solutions")}
              className="mobile-link"
            >
              Solutions
            </a>
            <a
              onClick={() => scrollToSection("pricing")}
              className="mobile-link"
            >
              Pricing
            </a>
            <a
              onClick={() => scrollToSection("resources")}
              className="mobile-link"
            >
              Resources
            </a>
            <a
              onClick={() => scrollToSection("finalcta")}
              className="mobile-link"
            >
              Contact
            </a>

            {!isLoggedIn ? (
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                  className="w-full py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium"
                >
                  Login
                </button>
                <div>
                  <button
                    onClick={() =>setRegisterOpen(!registerOpen)}
                    className="w-full py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium"
                  >
                    Register
                  </button>

                  {registerOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <button
                        onClick={() => {
                          navigate("/register/landlord");
                          closeMobileMenu();
                        }}
                        className="block w-30 border border-gray-400 rounded-sm shadow-md text-left text-md text-white bg-indigo-600 p-2"
                      >
                        → As Landlord
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    navigate("/book-demo");
                    closeMobileMenu();
                  }}
                  className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium"
                >
                  Book Demo
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-2 border-b border-gray-500 pb-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                    {userInitial}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">Logged in</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/landlord");
                    closeMobileMenu();
                  }}
                  className="w-full text-left py-2 px-2 rounded-md hover:bg-gray-100 font-medium text-gray-700"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    navigate("/landlord/my-account");
                    closeMobileMenu();
                  }}
                  className="w-full text-left py-2 px-2 rounded-md hover:bg-gray-100 font-medium text-gray-700"
                >
                  Manage Account
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="w-full text-left py-2 px-2 rounded-md text-red-600 hover:bg-red-50 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
