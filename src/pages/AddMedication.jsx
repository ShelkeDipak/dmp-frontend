import { useMedications } from "../context/MedicationContext";
import { useState, useEffect } from "react";
import { ArrowLeft, Clock, CalendarDays, Infinity } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddMedication() {
  const navigate = useNavigate();
  const { addMedication } = useMedications();

  // ✅ Default startDate = today's date
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [reminder, setReminder] = useState(true);
  const [refill, setRefill] = useState(false);
  const [time, setTime] = useState("");

  // 🔔 Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // 🔔 Schedule Daily Notification
  const scheduleDailyNotification = (medName, medTime) => {
    if (!("Notification" in window)) return;

    const [hours, minutes] = medTime.split(":").map(Number);
    const now = new Date();
    const alarmTime = new Date();
    alarmTime.setHours(hours, minutes, 0, 0);

    // If time already passed today, schedule for tomorrow
    if (alarmTime <= now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    const delay = alarmTime - now;

    setTimeout(() => {
      new Notification("💊 Medication Reminder", {
        body: `It's time to take your ${medName}.`,
        icon: "/icons/medicine.png",
      });

      // Repeat every 24 hours
      setInterval(() => {
        new Notification("💊 Medication Reminder", {
          body: `It's time to take your ${medName}.`,
          icon: "/icons/medicine.png",
        });
      }, 24 * 60 * 60 * 1000);
    }, delay);
  };

  // ✅ Add Medication
  const handleAddMedication = () => {
    const medName = document.querySelector('input[placeholder="Medicine Name"]').value;
    const medDose = document.querySelector('input[placeholder="Dosage (e.g., 500mg)"]').value;

    if (!medName || !medDose || !time) {
      alert("Please fill all required fields including time.");
      return;
    }

    const newMedication = {
      name: medName,
      dosage: medDose,
      frequency,
      duration,
      startDate,
      time,
      reminder,
      refill,
      status: "Take",
    };

    addMedication(newMedication);

    if (reminder) scheduleDailyNotification(medName, time);

    // ✅ Go to home after adding
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-6 flex items-center">
        <button
          onClick={() => navigate("/patient-login")}
          className="p-2 rounded-full hover:bg-green-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-3">New Medicines</h1>
      </header>

      {/* Main Form */}
      <main className="flex-grow w-full max-w-2xl mx-auto bg-white shadow-md rounded-b-2xl p-8 space-y-8 mt-4">
        {/* Medication Name & Dose */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Medicine Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
          <input
            type="text"
            placeholder="Dosage (e.g., 500mg)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
        </div>

        {/* Frequency */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-3">How often?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Once daily", sub: "1-0-0" },
              { label: "Twice daily", sub: "1-0-1" },
              { label: "Three times daily", sub: "1-1-1" },
              { label: "As needed", sub: "As needed" },
            ].map((option) => (
              <button
                key={option.sub}
                onClick={() => setFrequency(option.sub)}
                className={`border rounded-xl p-3 text-sm font-medium transition flex flex-col items-center ${
                  frequency === option.sub
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-gray-50 hover:bg-green-50 border-gray-300"
                }`}
              >
                <span>{option.label}</span>
                <small>{option.sub}</small>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-3">For how long?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "7", sub: "7 days" },
              { label: "14", sub: "14 days" },
              { label: "30", sub: "30 days" },
              { label: "90", sub: "90 days" },
              { label: <Infinity size={18} />, sub: "Ongoing" },
            ].map((opt) => (
              <button
                key={opt.sub}
                onClick={() => setDuration(opt.sub)}
                className={`border rounded-xl p-3 text-sm font-medium transition flex flex-col items-center ${
                  duration === opt.sub
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-gray-50 hover:bg-green-50 border-gray-300"
                }`}
              >
                <span>{opt.label}</span>
                <small>{opt.sub}</small>
              </button>
            ))}
          </div>
        </div>

        {/* Start Date */}
        <div className="border p-3 rounded-xl hover:bg-gray-50 transition flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CalendarDays className="text-green-600" />
            <span className="font-medium text-gray-700">
              Starts{" "}
              {new Date(startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent border-none focus:outline-none cursor-pointer"
          />
        </div>

        {/* Time Picker */}
        <div className="border p-3 rounded-xl hover:bg-gray-50 transition flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="text-green-600" />
            <span className="font-medium text-gray-700">Select Time</span>
          </div>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          {[
            { label: "Reminders", state: reminder, setState: setReminder },
            { label: "Refill Tracking", state: refill, setState: setRefill },
          ].map(({ label, state, setState }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{label}</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={state}
                  onChange={() => setState(!state)}
                  className="hidden"
                />
                <span
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                    state ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                      state ? "translate-x-5" : ""
                    }`}
                  />
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={handleAddMedication}
            className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold"
          >
            Add Medication
          </button>

          <button
            onClick={() => navigate("/patient-dashboard")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
