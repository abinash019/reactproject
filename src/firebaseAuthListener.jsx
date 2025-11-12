import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/authThunk";
import { auth } from "./firebase";

const FirebaseAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        dispatch(fetchUserProfile());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return null; // no loading UI here
};

export default FirebaseAuthListener;
