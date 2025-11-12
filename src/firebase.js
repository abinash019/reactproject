// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 👈 Add this line
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI2QYFyQ1vY7Tw_daTVsprxU3QXBTOEKc",
  authDomain: "trackmyincome-a08b7.firebaseapp.com",
  projectId: "trackmyincome-a08b7",
  storageBucket: "trackmyincome-a08b7.firebasestorage.app",
  messagingSenderId: "402663927451",
  appId: "1:402663927451:web:79b57a3d1c48915ec8a03e",
  measurementId: "G-KS0SHHP56M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 👇 Export auth to use it in login/signup
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
