import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

async function extractAllDatas(currentSection) {
  const res = await fetch(`/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });


  if (!res.ok) {
    const errorText = await res.text(); // Get raw response for debugging
    console.error(`Fetch failed for ${currentSection}: ${res.status} - ${errorText}`);
    throw new Error(`Failed to fetch ${currentSection} data: ${res.status}`);
  }

  const data = await res.json();
  return data && data.data;
}

export default async function Home() {
  // Use try-catch to handle any fetch errors gracefully
  let homeSectionData = [];
  let aboutSectionData = [];
  let experienceSectionData = [];
  let educationSectionData = [];
  let projectSectionData = [];

  try {
    homeSectionData = await extractAllDatas("home");
    aboutSectionData = await extractAllDatas("about");
    experienceSectionData = await extractAllDatas("experience");
    educationSectionData = await extractAllDatas("education");
    projectSectionData = await extractAllDatas("project");
  } catch (error) {
    console.error("Error loading section data:", error);
    // Optionally, return fallback UI or empty data
  }

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView
        data={
          aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
        }
      />
      <ClientExperienceAndEducationView
        educationData={educationSectionData}
        experienceData={experienceSectionData}
      />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  );
}