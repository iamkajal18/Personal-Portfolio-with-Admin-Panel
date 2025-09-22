"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import FormControls from "../form-controls";
import Image from "next/image";

const controls = [
  { name: "name", placeholder: "Enter Project Name", type: "text", label: "Project Name" },
  { name: "technologies", placeholder: "Enter Technologies (comma-separated)", type: "text", label: "Technologies" },
  { name: "website", placeholder: "Enter Website URL", type: "text", label: "Website" },
  { name: "github", placeholder: "Enter GitHub URL", type: "text", label: "GitHub" },
  { name: "description", placeholder: "Enter Project Description", type: "textarea", label: "Project Description" },
];

export default function AdminProjectView({
  formData,
  setFormData,
  handleSaveData,
  handleDeleteData,
  handleEditData,
  data,
}) {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    console.log("Admin View - Current formData:", { ...formData, _id: formData._id ? "present" : "absent" });
  }, [formData]);

  useEffect(() => {
    console.log("Admin View - Project data received:", data);
  }, [data]);

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-2xl mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          {formData._id ? "Update Project" : "Add New Project"}
        </h2>

        <FormControls controls={controls} formData={formData} setFormData={setFormData} />

        <CldUploadWidget
          uploadPreset="portfolio"
          onSuccess={(result) => {
            console.log("Admin View - Upload success result:", result);
            if (result?.info && typeof result.info === "object" && "secure_url" in result.info) {
              setFormData((prevFormData) => {
                const newFormData = { ...prevFormData, image: result.info.secure_url };
                console.log("Admin View - Updated formData with image:", newFormData);
                return newFormData;
              });
            }
            setIsUploading(false);
          }}
          onError={(error) => {
            console.error("Admin View - Cloudinary upload error:", error);
            setIsUploading(false);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => {
                console.log("Admin View - Opening Cloudinary widget, current formData:", formData);
                setIsUploading(true);
                open();
              }}
              className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg shadow-sm transition-all duration-200 disabled:bg-amber-400"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : formData.image ? "Change Image" : "Upload Image"}
            </button>
          )}
        </CldUploadWidget>

        {formData.image && (
          <div className="mt-4">
            <div className="relative w-full h-40 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <Image
                src={formData.image}
                alt="Project Preview"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        )}

        <button
          onClick={() => {
            console.log("Admin View - FormData before saving:", formData);
            handleSaveData();
          }}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white secondary-color: white font-medium py-2 rounded-lg shadow-sm transition-all duration-200 disabled:bg-blue-400"
          disabled={isUploading || !formData.name}
        >
          {formData._id ? "Update Project" : "Add Project"}
        </button>
      </div>

      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Project List</h2>
        </div>
        {data && data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Image</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Technologies</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Website</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">GitHub</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td className="py-3 px-4 text-sm">
                      {item.image && (
                        <div className="relative w-16 h-16 rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">{item.name || "Unnamed"}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">{item.technologies || "N/A"}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-xs block">
                        {item.website || "N/A"}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      <a href={item.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-xs block">
                        {item.github || "N/A"}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 max-w-md">
                      <p className="line-clamp-3 break-words">{item.description || "No description available"}</p>
                    </td>
                    <td className="py-3 px-4 text-sm flex gap-2">
                      <button
                        onClick={() => {
                          console.log("Admin View - Editing item:", item);
                          handleEditData(item);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        title="Edit Project"
                        aria-label="Edit Project"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => {
                          console.log("Admin View - Deleting item with id:", item._id);
                          handleDeleteData(item._id);
                        }}
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