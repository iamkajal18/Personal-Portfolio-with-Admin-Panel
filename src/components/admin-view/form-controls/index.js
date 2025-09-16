"use client";

export default function FormControls({ controls, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("noof") ? parseInt(value) || "" : value, // Convert number fields to integers
    }));
  };

  return (
    <div className="space-y-4">
      {controls.map((control) => (
        <div key={control.name} className="flex flex-col">
          <label htmlFor={control.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {control.label}
          </label>
          <input
            type={control.type}
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={formData[control.name] || ""}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      ))}
    </div>
  );
}