import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NavigationPage from './components/ui/Navigation';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>; // Auth0 initialization wait

  return (
    <>
      <NavigationPage />

      <Routes>
        {/* Public login page */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />

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
        {/*
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        */}
        {/* Default route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
