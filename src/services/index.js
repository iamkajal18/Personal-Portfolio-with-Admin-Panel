export async function addData(currentTab, formData) {
  try {
    console.log("Sending add request:", {
      url: `/api/${currentTab}/add`,
      formData: { ...formData, _id: formData._id ? "present" : "absent" },
    });
    const response = await fetch(`/api/${currentTab}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log("Add response:", {
      ...result,
      data: result.data ? { ...result.data, _id: result.data._id ? "present" : "absent" } : null,
    });
    if (!response.ok) throw new Error(result.message || "Add failed");
    return result;
  } catch (e) {
    console.error("Error adding data:", e);
    return { success: false, error: e.message };
  }
}

export async function getData(currentTab) {
  try {
    console.log("Sending get request:", { url: `/api/${currentTab}/get` });
    const response = await fetch(`/api/${currentTab}/get`, { method: "GET" });
    const result = await response.json();
    console.log("Get response:", {
      ...result,
      data: result.data
        ? result.data.map((item) => ({
            ...item,
            _id: item._id ? "present" : "absent",
            description: item.description || "(missing)",
          }))
        : null,
    });
    if (!response.ok) throw new Error(result.message || "Get failed");
    return result;
  } catch (e) {
    console.error("Error getting data:", e);
    return { success: false, error: e.message };
  }
}

export async function updateData(currentTab, formData) {
  try {
    if (!formData._id) {
      throw new Error("Missing _id in formData");
    }
    console.log("Sending update request:", {
      url: `/api/${currentTab}/update`,
      formData: { ...formData, _id: "present", description: formData.description || "(missing)" },
    });
    const response = await fetch(`/api/${currentTab}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log("Update response:", {
      ...result,
      data: result.data ? { ...result.data, _id: "present", description: result.data.description || "(missing)" } : null,
    });
    if (!response.ok) throw new Error(result.message || "Update failed");
    return result;
  } catch (e) {
    console.error("Error updating data:", e);
    return { success: false, error: e.message };
  }
}

export async function deleteData(currentTab, id) {
  try {
    console.log("Sending delete request:", { url: `/api/${currentTab}/delete?id=${encodeURIComponent(id)}`, id: "masked" });
    const response = await fetch(`/api/${currentTab}/delete?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log("Delete response:", result);
    if (!response.ok) throw new Error(result.error || "Delete failed");
    return result;
  } catch (e) {
    console.error("Error deleting data:", e);
    return { success: false, error: e.message };
  }
}

export async function login(formData) {
  try {
    console.log("Sending login request:", { url: "/api/login", formData: { ...formData, password: "masked" } });
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log("Login response:", result);
    if (!response.ok) throw new Error(result.message || "Login failed");
    return result;
  } catch (e) {
    console.error("Error during login:", e);
    return { success: false, error: e.message };
  }
}