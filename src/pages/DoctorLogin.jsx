import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    // Dummy doctor info
    const dummyDoctor = {
      name: "Dr. Aditi Verma",
      specialization: "Cardiologist",
      patients: [
        { id: "PAT-001", name: "Ravi Sharma", age: 32, condition: "Fever" },
        { id: "PAT-002", name: "Meena Patil", age: 45, condition: "Diabetes" },
        { id: "PAT-003", name: "Arjun Mehta", age: 27, condition: "Asthma" },
      ],
    };
    setDoctorData(dummyDoctor);
  }, []);

  if (!doctorData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading Doctor Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
      <Navbar />

      <div className="pt-24 px-6 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-700">
              👨‍⚕️ Welcome, {doctorData.name}
            </h1>
            <p className="text-gray-500 text-lg">
              Specialization: {doctorData.specialization}
            </p>
          </div>

          {/* View History Button */}
          <button
            onClick={() => navigate("/view-patient-history")}
            className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition"
          >
            📋 View Patient History
          </button>
        </div>

        {/* Active Patients List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🧑‍🤝‍🧑 Active Patients
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-gray-700 border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Patient ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctorData.patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{patient.id}</td>
                    <td className="p-3">{patient.name}</td>
                    <td className="p-3">{patient.age}</td>
                    <td className="p-3">{patient.condition}</td>
                    <td className="p-3">
                      <button
                        onClick={() => navigate("/view-patient-history")}
                        className="text-blue-600 hover:underline"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
