import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const claims = await getIdTokenClaims();
      const userRoles = claims?.["https://abinash019auth.netlify.app/roles"] || [];
      setRoles(userRoles);
    };
    fetchRoles();
  }, [getIdTokenClaims]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!roles.includes("Admin")) return <Navigate to="/home" />; // redirect non-admin users

  return children;
};

export default AdminRoute;
