import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NavigationPage from './components/ui/Navigation';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './routes/AdminRoute';
import Signup from './pages/auth/Signup';
import LocalProfile from './pages/LocalProfile';
import { useState } from 'react';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );

  if (isLoading) return <div>Loading...</div>; // Auth0 initialization wait

  return (
    <>
      <NavigationPage />

      <Routes>
        {/* Public login page */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />} />


        {/* Protected routes */}
        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/localprofile"
          element={
            isLoggedIn ? (
              <LocalProfile onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        {/*
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        */}
        {/* Default route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
