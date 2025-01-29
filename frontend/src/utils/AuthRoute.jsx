import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { getToken } from "../services/TokenServices";

export const AuthRoute = ({children}) => {
    const { isLoading } = useAuth();
    
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (getToken()) {
      return <Navigate to="/" />;
    }
    
    return <>{children}</>;
  }
  
  export const ProtectedRoute = ({children}) => {
    const { isLoading } = useAuth();
    
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (!getToken()) {
      return <Navigate to="/login" />;
    }
    
    return <>{children}</>;
  }
  
  export const AdminRoute = ({children}) => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (!getToken()) {
      return <Navigate to="/login" />;
    }
    
    if (user && user.role !== 0) {
      return <Navigate to="/" />;
    }
    
    return <>{children}</>;
  }