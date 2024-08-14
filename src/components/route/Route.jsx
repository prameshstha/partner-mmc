import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
  const token = useSelector((state) => state.authStore.token);
  return token ? <Navigate to="/" /> : <Outlet />;
};

export const PrivateRoute = () => {
  const token = useSelector((state) => state.authStore.token);
  return token ? <Outlet /> : <Navigate to="/signin" />;
};
