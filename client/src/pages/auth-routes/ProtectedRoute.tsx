import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import DataContext from "@context/data-context";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(DataContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
