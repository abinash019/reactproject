import React from "react";
import { Button } from "../components/ui/button";

const LocalProfile = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p className="text-center mt-10">No user found. Please sign up.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Bio:</strong> {user.bio}</p>

      <div className="mt-6 flex justify-between">
        <Button onClick={() => { localStorage.removeItem("user"); onLogout(); }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LocalProfile;
