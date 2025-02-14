import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { getToken } from "../services/TokenServices";

const RouteGuard = ({ children, condition, redirect }) => {
  const { isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  return condition ? <Navigate to={redirect} /> : <>{children}</>;
};

export const AuthRoute = ({ children }) => (
  <RouteGuard condition={getToken()} redirect="/">
    {children}
  </RouteGuard>
);

export const ProtectedRoute = ({ children }) => (
  <RouteGuard condition={!getToken()} redirect="/login">
    {children}
  </RouteGuard>
);

export const SellerRoute = ({ children }) => {
  const { user } = useAuth();
  return (
    <RouteGuard condition={!getToken() || (user && user.role !== 1)} redirect="/">
      {children}
    </RouteGuard>
  );
};


export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return (
    <RouteGuard condition={!getToken() || (user && user.role !== 0)} redirect="/">
      {children}
    </RouteGuard>
  );
};