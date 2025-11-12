import React, { useState } from "react";
import { Button } from "../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../redux/authSlice";


const LocalProfile = ({ onLogout }) => {
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.auth.user);


  // JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || { firstName: '', lastName: '', email: '', phone: '', bio: '' });

  const [originalUser, setOriginalUser] = useState(storedUser);


  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);






  if (!user) {
    return <p className="text-center mt-10">No user found. Please sign up.</p>;
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setLoading(true)
    dispatch(updateUser(user))
    //localStorage.setItem("user", JSON.stringify(user));

    setTimeout(() => {
      setLoading(false)
      setIsEditing(false);
      toast.success('Saved successfully!');
    }, 1000);


  };
  const handleCancel = () => { setUser(originalUser); setIsEditing(false); };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };



  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      {isEditing ? (
        <div className="space-y-4 text-start">
          <div className="flex ">
            <div className="mr-4">
              <label className="block font-medium ">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mt-6 flex justify-between">
            <Button className="bg-green-600 hover:bg-green-800" onClick={handleSave}>{loading ? 'Saving....' : 'Save'}</Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>




        </div>) : (

        <div>
          <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Bio:</strong> {user.bio}</p>

          <div className="mt-6 flex justify-between">
            <Button className="bg-red-500 hover:bg-red-800" onClick={handleLogout}>
              Logout
            </Button>
            <Button onClick={() => { setIsEditing(true) }}>
              Edit
            </Button>
          </div>
        </div>)}
    </div >
  );
};

export default LocalProfile;
