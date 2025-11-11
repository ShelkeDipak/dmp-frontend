import React from "react";
import Navbar from "../components/Navbar";

export default function ViewPatientHistory() {
  const historyData = [
    {
      date: "2025-11-01",
      diagnosis: "Fever",
      prescription: "Paracetamol 500mg (2x daily)",
      doctor: "Dr. Aditi Verma",
    },
    {
      date: "2025-10-20",
      diagnosis: "Cough",
      prescription: "Cough Syrup (3x daily)",
      doctor: "Dr. Aditi Verma",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 px-6 md:px-16">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
          📜 Patient Medical History
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {historyData.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No medical history found.
            </p>
          ) : (
            <table className="w-full border-collapse text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Diagnosis</th>
                  <th className="p-3 text-left">Prescription</th>
                  <th className="p-3 text-left">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((entry, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{entry.date}</td>
                    <td className="p-3">{entry.diagnosis}</td>
                    <td className="p-3">{entry.prescription}</td>
                    <td className="p-3">{entry.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
