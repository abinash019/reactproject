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
import { useSelector, useDispatch, Provider } from "react-redux";
import { decrement, increment, reset, setStep } from './redux/counterSlice';
import { store } from './redux/store';
import { Button } from './components/ui/button';
import RouteProtected from './routes/RouteProtected';
import { logout } from './redux/authSlice';
import DashboardLayout from './pages/DashboardLayout';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );

  /*function Counter() {
    const { count, step } = useSelector(state => state.counter);
    const dispatch = useDispatch();
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Counter: {count}</h1>
        <h3>Step: {step}</h3>
        <input
          type="number"
          value={step}
          onChange={(e) => dispatch(setStep(Number(e.target.value)))}
        />


        <Button onClick={() => dispatch(decrement())} style={{ marginRight: "10px" }}>-</Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button className='mx-4' onClick={() => dispatch(reset())}>Reset</Button>

      </div>
    );
  }*/

  if (isLoading) return <div>Loading...</div>; // Auth0 initialization wait

  return (
    <>

      <NavigationPage />





      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboards" />} />

        {/* Public login page 
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />*/}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboards" />} />

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
            <RouteProtected>
              <LocalProfile onLogout={() => dispatch(logout())} />
            </RouteProtected>
          }
        />


        {/* <Route
            path="/localprofile"
            element={
              isLoggedIn ? (
                <LocalProfile onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          /> */}



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

        <Route
          path="/dashboards"
          element={
            <ProtectedRoute>

              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboards"
          element={
            <ProtectedRoute>

              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
