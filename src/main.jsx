// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MedicationProvider } from "./context/MedicationContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js", {
        scope: "/",
      });
      console.log("✅ Service Worker registered:", registration.scope);
    } catch (error) {
      console.error("❌ Service Worker registration failed:", error);
    }
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MedicationProvider>
        <App />
      </MedicationProvider>
    </AuthProvider>
  </React.StrictMode>
);
