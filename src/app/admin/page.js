"use client";

import AdminAboutView from "@/components/admin-view/about";
import AdminContactView from "@/components/admin-view/contact";
import AdminEducationView from "@/components/admin-view/education";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminHomeView from "@/components/admin-view/home";
import Login from "@/components/admin-view/login";
import AdminProjectView from "@/components/admin-view/project";
import { addData, getData, login, updateData, deleteData } from "@/services";
import { useCallback, useEffect, useState } from "react";

const initialHomeFormData = { heading: "", summary: "" };
const initialAboutFormData = { aboutme: "", noofprojects: "", yearofexperience: "", noofclients: "", skills: "" };
const initialExperienceFormData = { position: "", company: "", duration: "", location: "", jobprofile: "" };
const initialEducationFormData = { degree: "", year: "", college: "" };
const initialProjectFormData = { name: "", website: "", technologies: "", github: "" };
const initialContactFormData = { name: "", email: "", message: "" };
const initialLoginFormData = { username: "", password: "" };

export default function AdminView() {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("home");
  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
  const [aboutViewFormData, setAboutViewFormData] = useState(initialAboutFormData);
  const [experienceViewFormData, setExperienceViewFormData] = useState(initialExperienceFormData);
  const [educationViewFormData, setEducationViewFormData] = useState(initialEducationFormData);
  const [projectViewFormData, setProjectViewFormData] = useState(initialProjectFormData);
  const [contactViewFormData, setContactViewFormData] = useState(initialContactFormData);
  const [allData, setAllData] = useState({});
  const [update, setUpdate] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [loginFormData, setLoginFormData] = useState(initialLoginFormData);

  const menuItems = [
    { id: "home", label: "Home", component: <AdminHomeView formData={homeViewFormData} setFormData={setHomeViewFormData} handleSaveData={handleSaveData} /> },
    { id: "about", label: "About", component: <AdminAboutView formData={aboutViewFormData} setFormData={setAboutViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.about} /> },
    { id: "experience", label: "Experience", component: <AdminExperienceView formData={experienceViewFormData} setFormData={setExperienceViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.experience} /> },
    { id: "education", label: "Education", component: <AdminEducationView formData={educationViewFormData} setFormData={setEducationViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.education} /> },
    { id: "project", label: "Project", component: <AdminProjectView formData={projectViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} setFormData={setProjectViewFormData} data={allData?.project} /> },
    { id: "contact", label: "Contact", component: <AdminContactView formData={contactViewFormData} setFormData={setContactViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.contact} /> },
  ];

  const extractAllDatas = useCallback(async () => {
    const response = await getData(currentSelectedTab);
    if (response?.success) {
      setAllData({ ...allData, [currentSelectedTab]: response.data });
    } else {
      console.error("Failed to fetch data:", { error: response?.error, response });
    }
  }, [currentSelectedTab, allData]);

  async function handleSaveData() {
    const dataMap = { 
      home: homeViewFormData, 
      about: aboutViewFormData, 
      education: educationViewFormData, 
      experience: experienceViewFormData, 
      project: projectViewFormData, 
      contact: contactViewFormData 
    };
    const formData = dataMap[currentSelectedTab];
    console.log("Saving data:", { tab: currentSelectedTab, formData, update });
    if (update && !formData._id) {
      console.error("Error: Missing _id for update operation");
      return;
    }
    const response = update ? await updateData(currentSelectedTab, formData) : await addData(currentSelectedTab, formData);
    if (response?.success) {
      console.log("Save successful:", response);
      resetFormDatas();
      extractAllDatas();
    } else {
      console.error("Save failed:", { error: response?.error, response });
    }
  }

  async function handleDeleteData(id) {
    console.log("Deleting id:", id);
    const response = await deleteData(currentSelectedTab, id);
    console.log("Delete response:", response);
    if (response?.success) {
      extractAllDatas();
    } else {
      console.error("Delete failed:", { error: response?.error, response });
    }
  }

  async function handleEditData(item) {
    console.log("Editing item:", item);
    if (currentSelectedTab === "about") {
      setAboutViewFormData(item);
    } else if (currentSelectedTab === "project") {
      setProjectViewFormData(item);
    } else if (currentSelectedTab === "contact") {
      setContactViewFormData(item);
    } else if (currentSelectedTab === "education") {
      setEducationViewFormData(item);
    } else if (currentSelectedTab === "experience") {
      setExperienceViewFormData(item);
      console.log("Updated experienceViewFormData:", item);
    }
    setUpdate(true);
  }

  useEffect(() => {
    extractAllDatas();
  }, [currentSelectedTab, extractAllDatas]);

  function resetFormDatas() {
    setHomeViewFormData(initialHomeFormData);
    setAboutViewFormData(initialAboutFormData);
    setExperienceViewFormData(initialExperienceFormData);
    setEducationViewFormData(initialEducationFormData);
    setProjectViewFormData(initialProjectFormData);
    setContactViewFormData(initialContactFormData);
    setUpdate(false);
  }

  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
  }, []);

  async function handleLogin() {
    const res = await login(loginFormData);
    if (res?.success) {
      setAuthUser(true);
      sessionStorage.setItem("authUser", JSON.stringify(true));
    } else {
      console.error("Login failed:", res?.error);
    }
  }

  if (!authUser)
    return <Login formData={loginFormData} handleLogin={handleLogin} setFormData={setLoginFormData} />;

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="p-4 font-bold text-xl text-black"
            onClick={() => { setCurrentSelectedTab(item.id); resetFormDatas(); }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => { setAuthUser(false); sessionStorage.removeItem("authUser"); }}
          className="p-4 font-bold text-xl text-black"
        >
          Logout
        </button>
      </nav>
      <div className="mt-10 p-10">{menuItems.find(item => item.id === currentSelectedTab)?.component}</div>
    </div>
  );
}