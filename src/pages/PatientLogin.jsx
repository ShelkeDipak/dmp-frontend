import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const api = import.meta.env.VITE_BACKEND_URL;

const PatientLogin = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "patient") navigate("/patient-dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${api}/auth/patient/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", "patient");
      setRole("patient");

      navigate("/patient-dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeft size={20} className="mr-1" /> Back
        </button>

        <h2 className="text-3xl font-bold text-green-600 text-center mt-4">
          Patient Login 💊
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Login to your Patient Dashboard
        </p>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-300 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-300 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition shadow-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
