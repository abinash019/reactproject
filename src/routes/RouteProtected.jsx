import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteProtected = ({ children }) => {
  //const { isAuthenticated, isLoading } = useAuth0();
  //const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  //if (isLoading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
};

export default RouteProtected;
