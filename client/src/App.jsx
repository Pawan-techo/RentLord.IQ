import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeRoutes from "./Routes/HomeRoutes";
import LandlordRoutes from "./Routes/LandlordRoutes";
import TenantRoutes from "./Routes/TenantRoutes";
import { useDispatch } from "react-redux";
import { getUser } from "./state/Auth/Action";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Routes/ProtectedRoute";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
  const handleStorageChange = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      window.location.href = "/";
    }
  };
  window.addEventListener("storage", handleStorageChange);
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/landlord/*" element={<ProtectedRoute allowedRole="LANDLORD"><LandlordRoutes /></ProtectedRoute>}/>
        <Route path="/tenant/*" element={ <ProtectedRoute allowedRole="TENANT"><TenantRoutes /></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;
