// src/pages/DoctorDashboard.jsx
import { useState, useRef } from "react";
import { FileUp, ClipboardList, FileText, Signature, Download } from "lucide-react";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

export default function DoctorDashboard() {
  const [prescription, setPrescription] = useState({
    patientName: "",
    age: "",
    gender: "",
    diagnosis: "",
    medications: "",
    advice: "",
  });
  const [testFile, setTestFile] = useState(null);
  const [signature, setSignature] = useState("");
  const signatureCanvas = useRef(null);
  const isDrawing = useRef(false);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({ ...prev, [name]: value }));
  };

  // Upload test results
  const handleFileChange = (e) => {
    setTestFile(e.target.files[0]);
  };

  // Draw signature on canvas
  const startDrawing = (e) => {
    isDrawing.current = true;
    const ctx = signatureCanvas.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const ctx = signatureCanvas.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  // Save signature as image
  const handleSignature = () => {
    const canvas = signatureCanvas.current;
    const image = canvas.toDataURL("image/png");
    setSignature(image);
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🩺 Digital Medical Prescription", 20, 20);
    doc.setFontSize(12);

    doc.text(`Patient Name: ${prescription.patientName}`, 20, 40);
    doc.text(`Age: ${prescription.age}`, 20, 50);
    doc.text(`Gender: ${prescription.gender}`, 20, 60);
    doc.text(`Diagnosis: ${prescription.diagnosis}`, 20, 70);

    doc.text("Medications:", 20, 85);
    doc.text(prescription.medications || "N/A", 20, 95, { maxWidth: 170 });

    doc.text("Advice / Notes:", 20, 120);
    doc.text(prescription.advice || "N/A", 20, 130, { maxWidth: 170 });

    if (signature) {
      doc.addImage(signature, "PNG", 20, 150, 50, 20);
      doc.text("Doctor’s Signature", 20, 175);
    }

    doc.save(`${prescription.patientName || "Prescription"}_Prescription.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* ✅ Navbar */}
      <Navbar />

      <div className="p-4 sm:p-8 md:p-12 mt-24"> {/* Added top margin to avoid overlap with fixed navbar */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-8 text-center">
          🩺 Doctor Dashboard
        </h1>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {[
            { icon: <ClipboardList className="mx-auto mb-2 text-blue-600" size={28} />, label: "Create Prescription" },
            { icon: <FileText className="mx-auto mb-2 text-green-600" size={28} />, label: "View Patient History" },
            { icon: <FileUp className="mx-auto mb-2 text-yellow-600" size={28} />, label: "Upload Test Results" },
            { icon: <Signature className="mx-auto mb-2 text-purple-600" size={28} />, label: "Add E-Signature" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition text-center cursor-pointer"
            >
              {item.icon}
              <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                {item.label}
              </h3>
            </div>
          ))}
        </div>

        {/* Prescription Form */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            🧾 Create Digital Prescription
          </h2>

          {/* Patient Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="patientName"
              value={prescription.patientName}
              onChange={handleChange}
              placeholder="Patient Name"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="age"
              value={prescription.age}
              onChange={handleChange}
              placeholder="Age"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="gender"
              value={prescription.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="diagnosis"
              value={prescription.diagnosis}
              onChange={handleChange}
              placeholder="Diagnosis"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Medications */}
          <textarea
            name="medications"
            value={prescription.medications}
            onChange={handleChange}
            placeholder="Medications (e.g., Paracetamol 500mg - twice a day)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-4"
            rows="4"
          />

          {/* Advice */}
          <textarea
            name="advice"
            value={prescription.advice}
            onChange={handleChange}
            placeholder="Advice / Notes"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-6"
            rows="3"
          />

          {/* File Upload */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium">
              Upload Test Results or Attach Files
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-3 rounded-lg"
            />
            {testFile && (
              <p className="mt-2 text-sm text-gray-600">
                ✅ Uploaded: {testFile.name}
              </p>
            )}
          </div>

          {/* Signature Canvas */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium">
              Add E-Signature
            </label>
            <div className="w-full overflow-x-auto">
              <canvas
                ref={signatureCanvas}
                width={400}
                height={150}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="border rounded-lg bg-gray-100 w-[400px] max-w-full"
              ></canvas>
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              <button
                onClick={handleSignature}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Signature
              </button>
              <button
                onClick={() => {
                  const ctx = signatureCanvas.current.getContext("2d");
                  ctx.clearRect(0, 0, signatureCanvas.current.width, signatureCanvas.current.height);
                  setSignature("");
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              >
                Clear
              </button>
            </div>

            {signature && (
              <img
                src={signature}
                alt="Signature Preview"
                className="mt-3 w-40 border rounded-md"
              />
            )}
          </div>

          {/* Generate PDF */}
          <button
            onClick={generatePDF}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition w-full"
          >
            <Download size={20} />
            <span>Generate PDF Prescription</span>
          </button>
        </div>
      </div>
    </div>
  );
}
