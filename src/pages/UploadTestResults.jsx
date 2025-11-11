import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function UploadTestResults() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

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
      alert("Please select a file first!");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      alert("✅ Test result uploaded successfully!");
      setUploading(false);
      setSelectedFile(null);
      setPreview(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 px-6 md:px-16">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
          📤 Upload Test Results
        </h1>
        <p className="text-gray-500 mb-6">
          Upload your lab reports or test results (PDF, image, etc.)
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 max-w-2xl">
          <label
            htmlFor="fileInput"
            className="block mb-4 font-medium text-gray-700"
          >
            Choose file to upload:
          </label>

          <input
            id="fileInput"
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg w-full p-2 mb-4"
          />

          {preview && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">File Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 rounded-lg border"
              />
            </div>
          )}

          {selectedFile && !preview && (
            <p className="text-sm text-gray-600 mb-4">
              Selected file: {selectedFile.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-6 py-3 rounded-lg text-white shadow-md ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
}
