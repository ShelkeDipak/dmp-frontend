import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useMedications } from "../context/MedicationContext";

export default function CalendarView() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const { medications } = useMedications();

  // Normalize and match dates properly
  const selectedDate = value.toDateString();

  const medsForDay = medications.filter((m) => {
    if (!m.startDate) return false;
    // handle both ISO ("2025-01-24") and toDateString() formats
    const medDate = new Date(m.startDate).toDateString();
    return medDate === selectedDate;
  });

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
        <h1 className="text-lg font-semibold ">Calendar</h1>
      </div>

      {/* Calendar section */}
      <div className="flex flex-col items-center mt-6 px-4">
        <Calendar
          onChange={setValue}
          value={value}
          className="rounded-xl shadow-lg p-4 bg-white"
        />

        <h2 className="text-lg font-semibold mt-6 mb-2">
          {value.toDateString()}
        </h2>

        <div className="bg-white rounded-2xl shadow p-4 w-full max-w-md">
          {medsForDay.length === 0 ? (
            <p className="text-gray-500 text-center">
              No medications scheduled for this day.
            </p>
          ) : (
            medsForDay.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b last:border-none py-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{m.name}</p>
                  <p className="text-sm text-gray-500">
                    {m.dosage || m.dose} • {m.time}
                  </p>
                </div>
                <button className="px-4 py-1 rounded-full bg-orange-500 text-white font-medium text-sm">
                  Take
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
