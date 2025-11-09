// src/pages/Login.jsx
import React, { useState, useEffect } from "react"; // 🟢 Added useEffect
import { useNavigate, useLocation } from "react-router-dom"; // 🟢 Added useLocation
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // ✅ use googleProvider from firebase.js
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🟢 Added
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginRole, setLoginRole] = useState("patient"); // 🟢 Added

  // 🟢 Detect login type based on route
  useEffect(() => {
    if (location.pathname === "/doctor-login") {
      setLoginRole("doctor");
    } else {
      setLoginRole("patient");
    }
  }, [location.pathname]);

  // 🔹 Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 🟢 Added redirect logic
      if (loginRole === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);

      // 🟢 Added redirect logic
      if (loginRole === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} className="mr-1" /> Back
        </button>

        {/* 🟢 Updated Title & Subtitle based on role */}
        <h2 className="text-3xl font-bold text-blue-600 text-center mt-4">
          {loginRole === "doctor" ? "Doctor Login 🩺" : "Welcome 👋"}
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          {loginRole === "doctor"
            ? "Login to your Doctor Dashboard"
            : "Login to Digital Medical Prescription"}
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
