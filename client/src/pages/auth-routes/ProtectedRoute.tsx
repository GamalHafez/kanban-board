import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "@context/data-context";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(DataContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login") {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
