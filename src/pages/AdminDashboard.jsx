import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p>Manage all users and roles here.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p>View admin reports and analytics.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p>Configure app settings and permissions.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
