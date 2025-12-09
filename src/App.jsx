// src/App.jsx
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

// Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LocalProfile from './pages/LocalProfile';
import DashboardLayout from './pages/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import AddTransaction from './pages/AddTransaction';
import TransactionList from './pages/TransactionList';
import DashboardPage from './pages/DashboardPage';
import NotFound from './pages/NotFound';

// Components
import NavigationPage from './components/ui/Navigation';
import ProtectedRoute from './routes/ProtectedRoute';
import RouteProtected from './routes/RouteProtected';
import AdminRoute from './routes/AdminRoute';
import FirebaseAuthListener from './firebaseAuthListener';
import { logout } from './redux/authSlice';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const { rehydrated, user } = useSelector(state => state.auth); // Redux state
  const { isAuthenticated: isAuth0Authenticated, isLoading } = useAuth0();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (!rehydrated || isLoading) return;
    const t = setTimeout(() => setAppReady(true), 500);
    return () => clearTimeout(t);
  }, [rehydrated, isLoading]);


  // Wait until Redux Persist rehydrated & Firebase user loaded
  const userLoaded = user !== undefined;
  if (!rehydrated || !userLoaded || isLoading) return <div>Loading...</div>;

  const isUserLoggedIn = isAuth0Authenticated || !!user;

  return (
    <>
      {/* Navigation */}
      <NavigationPage />

      {/* Firebase Auth Listener */}
      <FirebaseAuthListener />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<Navigate to={isUserLoggedIn ? "/dashboards" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={isUserLoggedIn ? <Navigate to="/dashboards" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isUserLoggedIn ? <Navigate to="/dashboards" replace /> : <Signup />}
        />
        <Route path="/addtransaction" element={<AddTransaction />} />
        <Route path="/showtransaction" element={<TransactionList />} />
        <Route path="/showstransaction" element={<DashboardPage />} />

        {/* Protected Routes */}
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
            <RouteProtected>
              <LocalProfile onLogout={() => dispatch(logout())} />
            </RouteProtected>
          }
        />
        <Route
          path="/dashboards"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={isUserLoggedIn ? "/dashboards" : "/login"} replace />} />

      </Routes>
    </>
  );
}

export default App;
