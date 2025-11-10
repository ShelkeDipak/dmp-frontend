// ✅ DoctorLogin.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ✅ Backend URL from environment (Render or local)
const api = import.meta.env.VITE_BACKEND_URL;

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { user, setRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔁 Redirect if already logged in as a doctor
  useEffect(() => {
    if (user) {
      const savedRole = localStorage.getItem("userRole");
      if (savedRole === "doctor") navigate("/doctor-dashboard");
    }
  }, [user, navigate]);

  // ✅ Email/Password Login with backend verification
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 🔹 Get Firebase token
      const token = await userCredential.user.getIdToken();

      // 🔹 Verify doctor on backend
      const res = await fetch(`${api}/verifyDoctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Backend verification failed");

      // 🔹 Save doctor role
      localStorage.setItem("userRole", "doctor");
      setRole("doctor");

      navigate("/doctor-dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  };

  // ✅ Google Login with backend verification
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // 🔹 Get Firebase ID Token
      const token = await result.user.getIdToken();

      // 🔹 Send token to backend for verification
      const res = await fetch(`${api}/verifyDoctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Backend verification failed");

      // 🔹 Save doctor role
      localStorage.setItem("userRole", "doctor");
      setRole("doctor");

      navigate("/doctor-dashboard");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} className="mr-1" /> Back
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-600 text-center mt-4">
          Doctor Login 🩺
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Login to your Doctor Dashboard
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

export default DoctorLogin;
