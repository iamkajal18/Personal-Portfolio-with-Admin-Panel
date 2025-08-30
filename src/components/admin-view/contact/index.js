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
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8 px-4">
      {/* Form Section */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-2xl mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          {formData._id ? "Update Contact" : "Add New Contact"}
        </h2>

        <FormControls controls={controls} formData={formData} setFormData={setFormData} />

        <button
          onClick={() => handleSaveData("contact")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 ease-in-out"
        >
          {formData._id ? "Update Contact" : "Add Contact"}
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Contact List</h2>
        </div>
        {data && data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      {item.email}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      {item.message}
                    </td>
                    <td className="py-4 px-6 text-sm flex gap-2">
                      <button
                        onClick={() => handleEditData(item)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        title="Edit Contact"
                        aria-label="Edit Contact"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteData(item._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                        title="Delete Contact"
                        aria-label="Delete Contact"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 italic">No entries found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
