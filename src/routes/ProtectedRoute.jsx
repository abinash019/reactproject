import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated: isAuth0Authenticated, isLoading } = useAuth0();
  const { isLoggedIn: isLocalAuthenticated } = useSelector(state => state.auth);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuth0Authenticated && !isLocalAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
