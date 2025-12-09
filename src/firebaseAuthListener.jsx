// src/firebaseAuthListener.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/authThunk";

const FirebaseAuthListener = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUserProfile())
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <div>Loading user...</div>;
  return null;
};

export default FirebaseAuthListener;
