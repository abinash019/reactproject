import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/ui/LogoutButton';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    isAuthenticated && (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <img
            src={user.picture || "https://www.nicepng.com/png/full/144-1446162_pin-businessman-clipart-png-flat-user-icon.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <LogoutButton />
        </div>
      </div>
    )
  );
};

export default Profile;
