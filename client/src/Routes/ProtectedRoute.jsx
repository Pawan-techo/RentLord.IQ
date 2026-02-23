import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("jwt");
  const { user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <LoadingScreen/>
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default ProtectedRoute;
