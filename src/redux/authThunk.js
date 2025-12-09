import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
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
        createdAt: new Date().toISOString(),
      });
      console.log("Saved to Firestore");

      // 🔥 LOGOUT AFTER SIGNUP (so user goes to login page)
      console.log("Logging out after signup...");
      await signOut(auth);

      // Return success object
      return {
        success: true,
        message: "Account created"
      };

    } catch (error) {
      console.error("Signup error:", error);
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Logging in...");
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase login successful:", user.uid);

      // Fetch Firestore profile
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("Profile not found for user:", user.uid);
        throw new Error("Profile not found");
      }

      const userData = docSnap.data();
      console.log("User profile loaded:", userData);
      return userData;

    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No current user in Firebase");
        throw new Error("No user logged in");
      }

      console.log("Fetching profile for user:", user.uid);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("Profile not found in Firestore");
        throw new Error("User profile not found");
      }

      const userData = docSnap.data();
      console.log("Profile fetched:", userData);
      return userData;

    } catch (error) {
      console.error("Fetch profile error:", error);
      return rejectWithValue(error.message || "Failed to fetch profile");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Logging out...");
      await signOut(auth); // Firebase logout
      console.log("Logged out from Firebase");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);