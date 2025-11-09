// src/pages/PatientDashboard.jsx
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  CalendarDays,
  Clock,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useMedications } from "../context/MedicationContext";
import Navbar from "../components/Navbar";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { medications, toggleMedicationStatus } = useMedications();

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
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Navbar */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow w-full mt-24 flex flex-col items-center pb-16">
        {/* Daily Progress */}
        <section className="w-full bg-gray-200 text-black py-10 px-6 shadow-md">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold">Daily Progress</h2>
              <p className="text-sm text-gray-700 mt-1">📅 {formattedDate}</p>
              <p className="text-sm text-gray-700 mt-1">
                {progress}% of doses completed
              </p>
            </div>

            <div className="w-28 h-28 md:w-32 md:h-32">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                  textColor: "#000",
                  pathColor: getProgressColor(),
                  trailColor: "#d1d5db",
                })}
              />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="max-w-5xl w-full mt-10 px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div
              onClick={() => navigate("/add-medication")}
              className="bg-green-100 rounded-2xl p-6 text-center cursor-pointer hover:shadow-md transition"
            >
              <PlusCircle className="mx-auto mb-2 text-green-600" size={28} />
              <div className="font-medium text-green-800">Add Medication</div>
            </div>

            <div
              onClick={() => navigate("/calendar")}
              className="bg-blue-100 rounded-2xl p-6 text-center cursor-pointer hover:shadow-md transition"
            >
              <CalendarDays className="mx-auto mb-2 text-blue-600" size={28} />
              <div className="font-medium text-blue-800">Calendar View</div>
            </div>

            <div
              onClick={() => navigate("/history-log")}
              className="bg-red-100 rounded-2xl p-6 text-center cursor-pointer hover:shadow-md transition"
            >
              <Clock className="mx-auto mb-2 text-red-600" size={28} />
              <div className="font-medium text-red-800">History Log</div>
            </div>

            <div
              onClick={() => navigate("/refill-tracker")}
              className="bg-orange-100 rounded-2xl p-6 text-center cursor-pointer hover:shadow-md transition"
            >
              <RefreshCw className="mx-auto mb-2 text-orange-600" size={28} />
              <div className="font-medium text-orange-800">Refill Tracker</div>
            </div>
          </div>
        </section>

        {/* Learn More Video */}
        <section className="max-w-5xl w-full mt-10 px-6">
          <h3 className="text-xl font-semibold mb-4">
            Learn More About Your Medications
          </h3>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <p className="text-gray-600 mb-4">
              Watch this short video to understand how Digital Medical
              Prescription helps you manage medications.
            </p>

            {/* Video container with gradient overlay */}
            <div className="relative w-full rounded-xl overflow-hidden h-56 md:h-80">
              <video
                controls
                className="w-full h-full object-cover"
                src="/videos/medicine-guide.mp4"
                type="video/mp4"
              >
                Your browser does not support the video tag.
              </video>

              {/* Gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-black/80" />
            </div>
          </div>
        </section>

        {/* Today's Schedule */}
        <section className="max-w-5xl w-full mt-10 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Today's Schedule</h3>
            <button
              onClick={() => navigate("/calendar")}
              className="text-blue-600 hover:underline text-sm"
            >
              See All
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 space-y-4 w-full">
            {medications.length === 0 ? (
              <p className="text-center text-gray-500">
                No medications added yet.
              </p>
            ) : (
              medications.map((med, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b last:border-none pb-3"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">{med.name}</h4>
                    <p className="text-sm text-gray-500">
                      {med.dosage || med.dose} • {med.time}
                    </p>
                  </div>

                  {med.status === "Taken" ? (
                    <button
                      onClick={() => toggleMedicationStatus(idx)}
                      className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 rounded-full bg-green-200 text-black hover:bg-green-300"
                    >
                      <CheckCircle2 className="mr-2" /> Taken
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleMedicationStatus(idx)}
                      className="mt-3 sm:mt-0 px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Take
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
