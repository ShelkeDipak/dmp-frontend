// For Vite
const BASE_URL = import.meta.env.VITE_API_URL;
console.log("✅ Base URL:", BASE_URL);

import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // change if you use cookies
});

// Attach token automatically (optional)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or a cookie
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
