import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Check if user is authenticated by looking for token
  const { isAuthenticated } = useAuth();
  //const isAuthenticated = !!localStorage.getItem('authUser');
  // If not authenticated, redirect to login
  if (!isAuthenticated ) {
    // Since we don't have react-router, we'll redirect page login
    return <Navigate to="/login" />;
  }

  // If authenticated, render children
  return <>{children}</>;
};


export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated  ? <>{children}</> : <Navigate to="/" />;
};