import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { logout as reduxLogout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout: auth0Logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1️⃣ Clear Redux/localStorage
    dispatch(reduxLogout());

    // 2️⃣ Logout from Auth0
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

    // 3️⃣ Optional: navigate to login page (Auth0 logout might also redirect)
    navigate("/login");
  };

  return (
    <button className="cursor-pointer font-bold 
    " onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
