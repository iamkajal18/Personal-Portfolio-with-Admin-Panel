import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

// Helper function for base URL
function getBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return `https://${process.env.VERCEL_URL || "personal-portfolio-with-admin-panel.vercel.app"}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

async function extractAllDatas(currentSection) {
  const baseUrl = getBaseUrl();
  console.log(`Fetching ${baseUrl}/api/${currentSection}/get`);

  const res = await fetch(`${baseUrl}/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(
      `Fetch failed for ${currentSection}: ${res.status} - ${errorText.substring(0, 100)}...`
    );
    throw new Error(`Failed to fetch ${currentSection} data: ${res.status}`);
  }

  const data = await res.json();
  console.log(`Fetched data for ${currentSection}:`, data);
  return data?.data;
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
    console.error("Error loading section data:", error);
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
