"use client";

import { useState } from "react";
import FormControls from "../form-controls";

const controls = [
  {
    name: "username",
    placeholder: "Enter Admin Username",
    type: "text",
    label: "Admin Username",
  },
  {
    name: "password",
    placeholder: "Enter Password",
    type: "password",
    label: "Password",
  },
];

export default function AdminLogin({ formData, setFormData, handleLogin }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Admin Panel Login</h2>
        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          onClick={handleLogin}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold text-white text-base transition-all duration-300 transform ${
            isHovered ? "bg-blue-700 scale-105" : "bg-blue-600"
          } hover:shadow-lg`}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}