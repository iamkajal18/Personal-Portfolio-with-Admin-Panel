import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

async function extractAllDatas(currentSection) {
  console.log(`Fetching /api/${currentSection}/get`); // Debug log
  const res = await fetch(`/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });

  console.log(`Response status for ${currentSection}: ${res.status}`); // Debug log
  if (!res.ok) {
    const errorText = await res.text(); // Capture HTML/error page
    console.error(`Fetch failed for ${currentSection}: ${res.status} - ${errorText.substring(0, 100)}...`);
    throw new Error(`Failed to fetch ${currentSection} data: ${res.status}`);
  }

  const data = await res.json();
  console.log(`Fetched data for ${currentSection}:`, data); // Debug log
  return data && data.data;
}

export default async function Home() {
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
    console.error("Error loading section data:", error); // Debug log
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