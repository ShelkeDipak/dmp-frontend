import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMedications } from "../context/MedicationContext";

export default function HistoryLog() {
  const navigate = useNavigate();
  const { medications, clearMedications } = useMedications();
  const [filter, setFilter] = useState("All");

  // Filter medications based on status
  const filteredMeds =
    filter === "All"
      ? medications
      : medications.filter((m) => m.status === filter);

  // Group meds by date
  const groupedMeds = filteredMeds.reduce((acc, med) => {
    const date = med.date || "Unknown Date";
    if (!acc[date]) acc[date] = [];
    acc[date].push(med);
    return acc;
  }, {});

  // Sort by newest date
  const sortedDates = Object.keys(groupedMeds).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 text-white flex items-center p-4">
        <button
          onClick={() => navigate("/patient-login")}
          className="p-2 rounded-full hover:bg-green-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold ml-3">History Log</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center space-x-4 mt-4">
        {["All", "Taken", "Missed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full font-medium ${
              filter === tab
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="px-6 mt-6 space-y-6">
        {sortedDates.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No medication history found.
          </p>
        ) : (
          sortedDates.map((date) => (
            <div key={date}>
              <h2 className="text-gray-800 font-semibold mb-3">{date}</h2>
              <div className="space-y-3">
                {groupedMeds[date].map((med, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-sm rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{med.name}</p>
                      <p className="text-sm text-gray-500">
                        {med.dosage || med.dose} • {med.time}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        med.status === "Taken"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {med.status || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear Button */}
      {medications.length > 0 && (
        <div className="flex justify-center mt-10 pb-10">
          <button
            onClick={clearMedications}
            className="text-red-600 bg-red-100 px-6 py-2 rounded-full font-medium hover:bg-red-200 transition"
          >
            🗑 Clear All Data
          </button>
        </div>
      )}
    </div>
  );
}
