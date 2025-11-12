import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ firstName, lastName, email, password, phone = "", bio = "" }, { rejectWithValue }) => {
    try {
      console.log("Creating user...");
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", user.uid);

      console.log("Updating profile...");
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      console.log("Profile updated");

      console.log("Saving to Firestore...");
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        phone,
        bio,
        createdAt: new Date(),
      });
      console.log("Saved to Firestore");

      return {
        uid: user.uid,
        firstName,
        lastName,
        email,
        phone,
        bio,
        createdAt: new Date().toISOString(),
      };

    } catch (error) {
      console.error("Signup error:", error);
      return rejectWithValue(error.message);
    }

  }
);


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // fetch Firestore profile
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Profile not found");

      return docSnap.data();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("User profile not found");

      return docSnap.data(); // ✅ returns firstName, lastName, email, phone, bio
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);