import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LocalProfile from './pages/LocalProfile';
import DashboardLayout from './pages/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';

import NavigationPage from './components/ui/Navigation';
import ProtectedRoute from './routes/ProtectedRoute';
import RouteProtected from './routes/RouteProtected';
import AdminRoute from './routes/AdminRoute';

import { logout } from './redux/authSlice';
import AddTransaction from './pages/AddTransaction';
import TransactionList from './pages/TransactionList';
import DashboardPage from './pages/DashboardPage';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated: isAuth0Authenticated, isLoading } = useAuth0();
  const { isLoggedIn } = useSelector((state) => state.auth); // Redux state

  const isUserLoggedIn = isAuth0Authenticated || isLoggedIn;

  if (isLoading) return <div>Loading...</div>;


  //thunk
  //redux persist

  return (
    <>
      <NavigationPage />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={!isUserLoggedIn ? <Login /> : <Navigate to="/dashboards" />} />
        <Route path="/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/dashboards" />} />
        <Route path="/signup" element={!isUserLoggedIn ? <Signup /> : <Navigate to="/dashboards" />} />
        <Route path="/addtransaction" element={<AddTransaction />} />
        <Route path="/showtransaction" element={<TransactionList />} />
        <Route path="/showstransaction" element={<DashboardPage />} />




        {/* Protected routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/localprofile" element={
          <RouteProtected>
            <LocalProfile onLogout={() => dispatch(logout())} />
          </RouteProtected>
        } />

        <Route path="/dashboards" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={isUserLoggedIn ? "/dashboards" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
