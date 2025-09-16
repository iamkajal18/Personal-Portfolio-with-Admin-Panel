"use client";

import AdminAboutView from "@/components/admin-view/about";
import AdminContactView from "@/components/admin-view/contact";
import AdminEducationView from "@/components/admin-view/education";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminHomeView from "@/components/admin-view/home";
import AdminProjectView from "@/components/admin-view/project";
import Login from "@/components/admin-view/login";
import { addData, getData, login, updateData, deleteData } from "@/services";
import { useCallback, useEffect, useState } from "react";

// Initial form data for each section
const initialHomeFormData = { heading: "", summary: "" };
const initialAboutFormData = { aboutme: "", noofprojects: "", yearofexperience: "", noofclients: "", skills: "" };
const initialExperienceFormData = { position: "", company: "", duration: "", location: "", jobprofile: "" };
const initialEducationFormData = { degree: "", year: "", college: "" };
const initialProjectFormData = { name: "", website: "", technologies: "", github: "", image: "", description: "" };
const initialContactFormData = { name: "", email: "", message: "" };
const initialLoginFormData = { username: "", password: "" };

// Icons for the navbar
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;
const ExperienceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>;
const EducationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>;
const ProjectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2v-2.308z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>;

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: <HomeIcon />, component: <AdminHomeView formData={homeViewFormData} setFormData={setHomeViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.home} /> },
    { id: "about", label: "About", icon: <AboutIcon />, component: <AdminAboutView formData={aboutViewFormData} setFormData={setAboutViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.about} /> },
    { id: "experience", label: "Experience", icon: <ExperienceIcon />, component: <AdminExperienceView formData={experienceViewFormData} setFormData={setExperienceViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.experience} /> },
    { id: "education", label: "Education", icon: <EducationIcon />, component: <AdminEducationView formData={educationViewFormData} setFormData={setEducationViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.education} /> },
    { id: "project", label: "Projects", icon: <ProjectIcon />, component: <AdminProjectView formData={projectViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} setFormData={setProjectViewFormData} data={allData?.project} /> },
    { id: "contact", label: "Contact", icon: <ContactIcon />, component: <AdminContactView formData={contactViewFormData} setFormData={setContactViewFormData} handleSaveData={handleSaveData} handleDeleteData={handleDeleteData} handleEditData={handleEditData} data={allData?.contact} /> },
  ];

  const extractAllDatas = useCallback(async () => {
    console.log(`Fetching data for tab: ${currentSelectedTab}`);
    const response = await getData(currentSelectedTab);
    if (response?.success) {
      setAllData((prevData) => ({
        ...prevData,
        [currentSelectedTab]: response.data,
      }));
      console.log(`Fetched data for ${currentSelectedTab}:`, response.data);
    } else {
      console.error("Failed to fetch data:", { error: response?.error, response });
    }
  }, [currentSelectedTab]);

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
      await extractAllDatas();
    } else {
      console.error("Save failed:", { error: response?.error, response });
    }
  }

  async function handleDeleteData(id) {
    console.log("Deleting id:", id);
    const response = await deleteData(currentSelectedTab, id);
    console.log("Delete response:", response);
    if (response?.success) {
      await extractAllDatas();
    } else {
      console.error("Delete failed:", { error: response?.error, response });
    }
  }

  async function handleEditData(item) {
    console.log("Editing item:", item);
    if (currentSelectedTab === "home") {
      setHomeViewFormData(item);
    } else if (currentSelectedTab === "about") {
      setAboutViewFormData(item);
    } else if (currentSelectedTab === "project") {
      setProjectViewFormData({ ...item, description: item.description || "" });
    } else if (currentSelectedTab === "contact") {
      setContactViewFormData(item);
    } else if (currentSelectedTab === "education") {
      setEducationViewFormData(item);
    } else if (currentSelectedTab === "experience") {
      setExperienceViewFormData(item);
    }
    setUpdate(true);
  }

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
    if (authUser) {
      extractAllDatas();
    }
  }, [currentSelectedTab, extractAllDatas, authUser]);

  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem("authUser") || "false"));
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

  if (!authUser) {
    return <Login formData={loginFormData} handleLogin={handleLogin} setFormData={setLoginFormData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 font-bold text-xl">Admin Panel</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      currentSelectedTab === item.id
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                    onClick={() => {
                      setCurrentSelectedTab(item.id);
                      resetFormDatas();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex md:items-center">
                <button
                  onClick={() => {
                    setAuthUser(false);
                    sessionStorage.removeItem("authUser");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <LogoutIcon className="mr-2" />
                  Logout
                </button>
              </div>
              <div className="md:hidden flex items-center ml-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg
                    className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`w-full flex items-center px-4 py-3 text-base font-medium transition-colors duration-200 ${
                  currentSelectedTab === item.id
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent"
                }`}
                onClick={() => {
                  setCurrentSelectedTab(item.id);
                  resetFormDatas();
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setAuthUser(false);
                sessionStorage.removeItem("authUser");
              }}
              className="w-full flex items-center px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 border-l-4 border-transparent"
            >
              <LogoutIcon className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {menuItems.find((item) => item.id === currentSelectedTab)?.component}
        </div>
      </main>
    </div>
  );
}