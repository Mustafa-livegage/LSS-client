import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log("User Role:", auth.role);
  const isAuthorized = auth?.role == allowedRoles;

  const storedAuthData = JSON.parse(localStorage.getItem("authData"));

  return isAuthorized ||
    (storedAuthData && storedAuthData.role === allowedRoles) ? (
    <Outlet />
  ) : storedAuthData ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
