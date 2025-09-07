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

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@/components/ui/button";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Button onClick={() => loginWithRedirect()}>Login with Auth0</Button>
    </div>
  );
};

export default Login;
