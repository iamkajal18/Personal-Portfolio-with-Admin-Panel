
"use client";

import FormControls from "../form-controls";

const controls = [
  { name: "name", placeholder: "Project Name", type: "text", label: "Project Name" },
  { name: "technologies", placeholder: "Enter Technologies", type: "text", label: "Technologies" },
  { name: "website", placeholder: "Website", type: "text", label: "Website" },
  { name: "github", placeholder: "Github", type: "text", label: "Github" },
];

export default function AdminProjectView({
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
          {formData._id ? "Update Project" : "Add New Project"}
        </h2>

        <FormControls controls={controls} formData={formData} setFormData={setFormData} />

        <button
          onClick={() => handleSaveData("project")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 ease-in-out"
        >
          {formData._id ? "Update Project" : "Add Project"}
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Project List</h2>
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
                    Technologies
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Github
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
                      {item.technologies}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      <a href={item.website} target="_blank" className="text-blue-600 hover:underline">
                        {item.website}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      <a href={item.github} target="_blank" className="text-blue-600 hover:underline">
                        {item.github}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-sm flex gap-2">
                      <button
                        onClick={() => handleEditData(item)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        title="Edit Project"
                        aria-label="Edit Project"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteData(item._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                        title="Delete Project"
                        aria-label="Delete Project"
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
            <p className="text-gray-500 dark:text-gray-400 italic">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
