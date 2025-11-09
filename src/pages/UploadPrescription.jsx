// src/pages/UploadPrescription.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Reusable Navbar

export default function UploadPrescription() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center flex-1 mt-24 px-6 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 shadow transition mb-6"
          >
            Back
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
            Upload Prescription
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter Doctor's Name *"
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Enter Patient's Name *"
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Enter Patient's Mobile Number *"
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <select className="w-full border border-gray-300 rounded-lg p-2 md:p-3 focus:ring-2 focus:ring-blue-400 outline-none">
              <option>Select Patient's Preferred Language *</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
              <option>Other</option>
            </select>

            {/* File Uploads */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Prescription Front Page *
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Prescription Back Page *
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg p-2 md:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 rounded-lg shadow-md transition"
            >
              Upload
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
