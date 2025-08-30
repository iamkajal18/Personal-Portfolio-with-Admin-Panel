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

export default function AdminHomeView({
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
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-xl mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          {formData._id ? "Update Profile" : "Add Profile Information"}
        </h2>

        <FormControls controls={controls} formData={formData} setFormData={setFormData} />

        <button
          onClick={() => handleSaveData("home")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 ease-in-out"
        >
          {formData._id ? "Update Profile" : "Add Profile"}
        </button>
      </div>

      {/* Current Profile Section */}
      {data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0) ? (
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Current Profiles</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Heading
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Summary
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Array.isArray(data)
                  ? data.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                          {item.heading || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                          {item.summary || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm flex gap-2">
                          <button
                            onClick={() => handleEditData(item)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                            title="Edit Profile"
                            aria-label="Edit Profile"
                            disabled={!item._id}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteData(item._id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                            title="Delete Profile"
                            aria-label="Delete Profile"
                            disabled={!item._id}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  : (
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                        {data.heading || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                        {data.summary || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-sm flex gap-2">
                        <button
                          onClick={() => handleEditData(data)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                          title="Edit Profile"
                          aria-label="Edit Profile"
                          disabled={!data._id}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteData(data._id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                          title="Delete Profile"
                          aria-label="Delete Profile"
                          disabled={!data._id}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl text-center py-6 text-gray-500 dark:text-gray-400 italic">
          No profile data available.
        </div>
      )}
    </div>
  );
}
