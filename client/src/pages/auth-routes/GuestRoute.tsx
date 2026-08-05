import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import DataContext from "@context/data-context";

export const GuestRoute = () => {
  const { isAuthenticated } = useContext(DataContext);

  if (isAuthenticated) {
    return <Navigate to="" replace />;
  }

  return <Outlet />;
};
