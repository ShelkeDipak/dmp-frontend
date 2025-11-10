import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const api = import.meta.env.VITE_BACKEND_URL;

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "doctor") navigate("/doctor-dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${api}/auth/doctor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save JWT token
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", "doctor");
      setRole("doctor");

      navigate("/doctor-dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} className="mr-1" /> Back
        </button>

        <h2 className="text-3xl font-bold text-blue-600 text-center mt-4">
          Doctor Login 🩺
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Login to your Doctor Dashboard
        </p>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

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
      </div>
    </div>
  );
};

export default DoctorLogin;
