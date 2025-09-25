// components/JsonUpload.jsx
import React from "react";

export default function JsonUpload({ onJsonUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        onJsonUpload(jsonData); // Pass parsed data to parent
      } catch (error) {
        alert("Invalid JSON file. Please upload a valid JSON.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Package JSON</h2>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-gray-900 file:text-white
          hover:file:bg-gray-800
        "
      />
      <p className="mt-2 text-gray-500 text-sm">
        Upload a JSON file to automatically populate the form.
      </p>
    </div>
  );
}
