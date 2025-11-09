import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMedications } from "../context/MedicationContext";

export default function RefillTracker() {
  const navigate = useNavigate();
  const { medications } = useMedications();

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
        <h1 className="text-lg font-semibold pl-4">Refill Tracker</h1>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-4">
        {medications.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No medications added yet.
          </p>
        ) : (
          medications.map((m, i) => {
            const currentSupply = m.supply || 0;
            const refillAt = m.refillAt || 0;
            const refillPercent =
              refillAt > 0 ? Math.round((currentSupply / refillAt) * 100) : 0;
            const status =
              refillPercent <= 20
                ? "Low"
                : refillPercent <= 70
                ? "Moderate"
                : "Good";
            const color =
              status === "Low"
                ? "text-red-600"
                : status === "Moderate"
                ? "text-yellow-600"
                : "text-green-600";

            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-4 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="font-semibold text-gray-800">{m.name}</h2>
                    <p className="text-sm text-gray-500">{m.dosage || "—"}</p>
                  </div>
                  <p className={`font-semibold ${color}`}>{status}</p>
                </div>

                <p className="text-sm text-gray-600">
                  Current Supply: <b>{currentSupply}</b> units
                </p>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${
                      refillPercent <= 20
                        ? "bg-red-500"
                        : refillPercent <= 70
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${refillPercent}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Refill at: {refillPercent}%
                </p>

                <button
                  disabled={refillPercent > 90}
                  className={`mt-3 w-full rounded-xl py-2 text-sm font-medium ${
                    refillPercent > 90
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  Record Refill
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
