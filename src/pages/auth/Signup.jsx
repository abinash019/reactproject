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

  const { user, loading, error, isLoggedIn, rehydrated } = useSelector((state) => state.auth);

  useEffect(() => {
    /*if (!rehydrated) return; // ⚡ Only run after rehydration
    console.log("Auth state after rehydration:", { loading, user, isLoggedIn, error });*/

    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [rehydrated, isLoggedIn, navigate]);


  const handleRedirect = () => {
    navigate('/login'); // This redirects to the signup page
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
  });

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  /*const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.success("Signup successful! Redirecting to login...");


    setTimeout(() => {
      dispatch(signup(formData))
      //localStorage.setItem("user", JSON.stringify(formData));
      setLoading(false);
      navigate("/login");

    }, 1000);


  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      password: formData.password
    })).unwrap() // ✅ unwrap() returns promise for success/failure
      .then(() => {
        toast.success("Signup successful! Redirecting to login...");
        navigate("/login"); // redirect after success
      })
      .catch((err) => {
        toast.error(err || "Signup failed");
      });
  };


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className=" space-y-4">

        <div className="flex space-x-4">

          <div className="flex-1">
            <Label htmlFor="firstName">First Name</Label>
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
            <Label htmlFor="lastName">Last Name</Label>
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
          <Label htmlFor="email">Email</Label>
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
            required
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
          <Label htmlFor="password">password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        <Button
          variant="link"  // Makes it text style (no button appearance)
          className=" mx-5 bg-white  hover:bg-gray-100 hover:underline hover:decoration-blue-500 py-2 px-4"
          onClick={handleRedirect}
        >
          <span className='text-blue-500'> Go to Login</span>
        </Button>
      </form>
    </div>
  );
};

export default Signup;
