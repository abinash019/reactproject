/*import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from 'react'
import { useNavigate } from "react-router-dom";




const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };*/

/* const handleSubmit = (e) => {
   e.preventDefault();
   console.log("Login Data:", formData);
   // यहाँ तिमी API call गर्न सक्छौ
 };*/
/*
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://abinash019.us.auth0.com/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          grant_type: "password",
          username: formData.email,
          password: formData.password,
          audience: "https://abinash019.us.auth0.com/api/v2/",
          scope: "openid profile email",
          client_id: "fpNlSA0pezmBci3smbPYwR0fZ6yFfS9d",
          connection: "Username-Password-Authentication"  // ✅ Add this line
        })
      });


      const data = await response.json();
      console.log("Tokens:", data);


      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("id_token", data.id_token);
        navigate("/home"); // redirect to home
      } else {
        console.error("Login failed", data);
      }
      // data.access_token and data.id_token use to authenticate user in your app
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full ">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login
*/

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { FaFacebook, FaUserPlus } from 'react-icons/fa';
import { SiAuth0 } from 'react-icons/si';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';

const Login = ({ onLogin }) => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  //const loading = useSelector((state) => state.auth.loading);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storedUser = useSelector(state => state.auth.user);



  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, password }; // fake user for demo
    // redirect after login



    // Fetch stored user data
    //const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found. Please sign up first.");
      return;
    }


    // if (storedUser.email === email && storedUser.password === password) 
    if (storedUser.email === email && storedUser.password === password) {
      dispatch(login(storedUser)); // sync Redux with localStorage

      setLoading(true);
      toast.success("Login successful! Redirecting...");


      setTimeout(() => {
        setLoading(false);
        setError("");
        if (onLogin) onLogin();

        navigate("/localprofile");

      }, 1000);

    } else {
      setError("Email or Password is incorrect!");
    }
  };




  const handleRedirect = () => {
    navigate('/signup'); // This redirects to the signup page
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <Label>Email

        </Label>
        <Input
          type='text'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}



        />

        <Label>Passsword</Label>
        <Input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
        <Button type="submit" className="min-w-[180px] mt-4">{loading ? "login..." : "Login"}</Button>

      </form>
      <Button
        variant="link"  // Makes it text style (no button appearance)
        className="mt-4 mx-5 bg-white  hover:bg-gray-100 hover:underline hover:decoration-blue-500 py-2 px-4"
        onClick={handleRedirect}
      >
        <span className='text-blue-500'> Go to Signup</span>
      </Button>

      <Button
        className="w-full flex items-center justify-center gap-2 border bg-white text-orange-500 shadow hover:bg-gray-100 mt-4"
        onClick={() => loginWithRedirect()}
      >
        <SiAuth0 className="text-orange-500" size={20} />
        <span className="text-orange-500">Continue with Auth0</span>
      </Button>





    </div >
  );
};

export default Login;
