import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";

export default function UploadTestResults() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploaded(false);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("⚠️ Please select a file first!");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      alert("✅ Test result uploaded successfully!");
      setSelectedFile(null);
      setPreview(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-10 relative">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <UploadCloud className="text-blue-600" /> Upload Test Results
          </h1>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            Upload your lab reports or test results in PDF or image format. You can view a live preview before uploading.
          </p>

          {/* File Input Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
            <input
              id="fileInput"
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <FileText className="w-10 h-10 text-blue-600" />
              <span className="text-gray-600 font-medium">
                {selectedFile ? selectedFile.name : "Click to choose file"}
              </span>
              <span className="text-xs text-gray-400">
                Supported: PDF, JPG, PNG
              </span>
            </label>
          </div>

          {/* Preview Section */}
          {preview && (
            <div className="mt-6">
              <p className="text-gray-700 text-sm font-medium mb-2">File Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg border w-full max-h-72 object-contain"
              />
            </div>
          )}

          {/* Upload Status */}
          {uploaded && (
            <div className="flex items-center gap-2 text-green-600 mt-4">
              <CheckCircle2 /> File uploaded successfully!
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-6 py-3 rounded-xl font-medium text-white shadow-md transition-all w-full sm:w-auto ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
