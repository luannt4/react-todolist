
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Check if user is authenticated by looking for token
  const isAuthenticated = !!localStorage.getItem('auth_token');

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // Since we don't have react-router, we'll redirect using window.location
    window.location.href = '/login';
    return null;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default PrivateRoute;
