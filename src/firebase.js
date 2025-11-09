// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFH9qMwHVXZEJ1XEOakjdBRVY2KmP51Dg",
  authDomain: "digital-medical-prescrip-c79bd.firebaseapp.com",
  projectId: "digital-medical-prescrip-c79bd",
  storageBucket: "digital-medical-prescrip-c79bd.appspot.com", // ✅ fixed
  messagingSenderId: "206950532395",
  appId: "1:206950532395:web:414c01c7a197dc45b6716e",
  measurementId: "G-GQWZ85L7G9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
