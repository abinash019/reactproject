import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/authThunk";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error, isLoggedIn } = useSelector((state) => state.auth);

  // 🔥 FIX: Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn || user) {
      console.log("User is already logged in, redirecting to dashboard");
      navigate("/dashboards");
    }
  }, [isLoggedIn, user, navigate]);

  const handleRedirect = () => {
    navigate('/login');
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        password: formData.password
      })).unwrap();

      toast.success("Account created successfully! Redirecting to login...");

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        bio: "",
        password: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      toast.error(typeof err === 'string' ? err : "Signup failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      {/* 🔥 SHOW ERROR IF ANY */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields - keep as before */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Input
            type="text"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Button
            variant="link"
            className="ml-2 p-0 h-auto text-blue-500 hover:text-blue-700"
            onClick={handleRedirect}
            type="button"
          >
            Login here
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;