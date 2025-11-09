import { useNavigate } from "react-router-dom";
import { useMedications } from "../context/MedicationContext";
import Navbar from "../components/Navbar";
import homeImage from "../assets/home-Img.png"; // ✅ Ensure path & filename match exactly

export default function Home() {
  const navigate = useNavigate();
  const { medications } = useMedications();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  });

  const total = medications.length;
  const taken = medications.filter((m) => m.status === "Taken").length;
  const progress = total > 0 ? Math.round((taken / total) * 100) : 0;

  const getProgressColor = () => {
    if (progress < 30) return "#f87171";
    if (progress < 70) return "#facc15";
    return "#22c55e";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-100 to-teal-200">
      {/* Navbar */}
 

      {/* Main Section */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 py-10 gap-10 text-center md:text-left">
        
        {/* Left Section - Image */}
        <div className="flex justify-center md:w-1/2">
          <img
            src={homeImage}
            alt="Prescrip Logo"
            className="w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain animate-pulse"
          />
        </div>

        {/* Right Section - Text */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-700 tracking-wide">
            Stay Healthy & Positive
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl">
            Your Digital Medical Prescription Assistant
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Today: {formattedDate}
          </p>

          {/* Doctor Login */}
          <button
            onClick={() => navigate("/doctor-login")}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition duration-300 w-52"
          >
            Doctor Login 🩺
          </button>

          {/* Patient Login */}
          <button
            onClick={() => navigate("/patient-login")}
            className="mt-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-md transition duration-300 w-52"
          >
            Patient Login 💊
          </button>
        </div>
      </main>
    </div>
  );
}
