// src/pages/AddDrug.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMedications } from "../context/MedicationContext";
import Navbar from "../components/Navbar"; // Import the reusable Navbar

export default function AddDrug() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { medications } = useMedications();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* ADD DRUG FORM */}
      <main className="flex-1 mt-24 px-4 sm:px-6 py-8 max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-2xl border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
            Add Drug to Database
          </h2>

          <form className="space-y-4">
            {[
              { label: "Drug Name", type: "text", placeholder: "Enter drug name" },
              { label: "Ingredient", type: "text", placeholder: "Enter ingredient" },
              { label: "Manufacturer", type: "text", placeholder: "Enter manufacturer name" },
              { label: "Marketed by", type: "text", placeholder: "Enter marketer's name" },
            ].map((field) => (
              <div
                key={field.label}
                className="flex flex-col md:flex-row items-start md:items-center"
              >
                <label className="w-full md:w-1/3 text-gray-700 mb-1 md:mb-0">
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full md:w-2/3 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            <div className="flex flex-col md:flex-row items-start md:items-center">
              <label className="w-full md:w-1/3 text-gray-700 mb-1 md:mb-0">
                Drug Type:
              </label>
              <select className="w-full md:w-2/3 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Choose Drug Type</option>
                <option>Tablet</option>
                <option>Capsule</option>
                <option>Syrup</option>
                <option>Drops</option>
                <option>Oint</option>
                <option>Powder</option>
                <option>Injection</option>
              </select>
            </div>

            {["Front", "Back"].map((label) => (
              <div
                key={label}
                className="flex flex-col md:flex-row items-start md:items-center"
              >
                <label className="w-full md:w-1/3 text-gray-700 mb-1 md:mb-0">
                  {label} Image:
                </label>
                <input
                  type="file"
                  className="w-full md:w-2/3 border rounded-md p-2 bg-gray-50"
                />
              </div>
            ))}

            <p className="text-sm text-gray-600 mt-4">
              If you don’t have Front or Back images, attach blank white images.
              Each file must be under 6MB.
            </p>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md mt-6 transition"
            >
              Upload to Database
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
