// src/pages/GeneratePrescription.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Reusable Navbar
import { useMedications } from "../context/MedicationContext";

export default function GeneratePrescription() {
  const navigate = useNavigate();
  const { medications } = useMedications();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex flex-col md:flex-row gap-6 flex-1 mt-24 px-6 py-8 max-w-6xl mx-auto w-full">
        {/* Left: Image Section */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src="/medical page.png"
            alt="Prescription"
            className="rounded-2xl shadow-lg w-full max-w-sm border border-gray-100"
          />
        </div>

        {/* Right: Form Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 shadow transition"
          >
            Back
          </button>

          <div className="space-y-4 mt-6">
            {/* Doctor Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Doctor's Name:
              </label>
              <input
                type="text"
                defaultValue="Sanjay"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Patient's Name:
              </label>
              <input
                type="text"
                defaultValue="Atharva"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-700 font-medium">
                Patient's Mobile Number:
              </label>
              <input
                type="text"
                defaultValue="9223210440"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Add Medicine */}
            <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-700 transition shadow">
              + ADD MEDICINE
            </button>

            {/* Generate / Download */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="flex-1 bg-gray-100 py-2 rounded-lg shadow hover:bg-gray-200 font-medium">
                GENERATE MULTIMEDIA PRESCRIPTION
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 font-medium">
                DOWNLOAD VIDEO
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
