"use client";

import FormControls from "../form-controls";

const controls = [
  { name: "name", placeholder: "Enter Name", type: "text", label: "Name" },
  { name: "email", placeholder: "Enter Email", type: "email", label: "Email" },
  { name: "message", placeholder: "Enter Message", type: "text", label: "Message" },
];

export default function AdminContactView({
  formData,
  setFormData,
  handleSaveData,
  handleDeleteData,
  handleEditData,
  data,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Form Section */}
      <div className="bg-white/90 dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3">
          {formData._id ? "Update Contact Info" : "Add Contact Info"}
        </h2>

        <FormControls controls={controls} formData={formData} setFormData={setFormData} />

        <button
          onClick={() => handleSaveData("contact")}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
        >
          {formData._id ? "Update Info" : "Add Info"}
        </button>
      </div>

      {/* Data List Section */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Existing Contact Entries
        </h2>

        {data && data.length > 0 ? (
          <div className="grid gap-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition hover:shadow-lg"
              >
                {/* Info */}
                <div className="space-y-1 text-gray-700 dark:text-gray-200">
                  <p><span className="font-semibold">Name:</span> {item.name}</p>
                  <p><span className="font-semibold">Email:</span> {item.email}</p>
                  <p><span className="font-semibold">Message:</span> {item.message}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditData(item)}
                    className="px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteData(item._id)}
                    className="px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 italic">No entries found.</p>
        )}
      </div>
    </div>
  );
}
