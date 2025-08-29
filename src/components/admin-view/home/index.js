"use client";

import FormControls from "../form-controls";

const controls = [
  {
    name: "heading",
    placeholder: "Enter heading text",
    type: "text",
    label: "Enter heading text",
  },
  {
    name: "summary",
    placeholder: "Enter Career summary",
    type: "text",
    label: "Enter Career summary",
  },
];

export default function AdminHomeView({ formData, setFormData, handleSaveData }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white/90 dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3">
          Add Profile Information
        </h2>

        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />

        <button
          onClick={() => handleSaveData("home")}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
        >
          Add Info
        </button>
      </div>
    </div>
  );
}
