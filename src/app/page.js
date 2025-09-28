import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

async function extractAllDatas(currentSection) {
  const baseUrl = process.env.NODE_ENV === "production"
    ? process.env.NEXTAUTH_URL || "https://personal-portfolio-with-admin-panel.vercel.app"
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/${currentSection}/get`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Fetch failed for ${currentSection}: ${res.status} - ${errorText}`);
      throw new Error(`Failed to fetch ${currentSection} data: ${res.status}`);
    }
    const data = await res.json();
    return data && data.data ? data.data : [];
  } catch (error) {
    console.error(`Error fetching ${currentSection} data:`, error);
    throw error;
  }
}

export default async function Home() {
  try {
    const [homeSectionData, aboutSectionData, experienceSectionData, educationSectionData, projectSectionData] = await Promise.all([
      extractAllDatas("home"),
      extractAllDatas("about"),
      extractAllDatas("experience"),
      extractAllDatas("education"),
      extractAllDatas("project"),
    ]);

    return (
      <div>
        <ClientHomeView data={homeSectionData || []} />
        <ClientAboutView data={aboutSectionData?.[0] || []} />
        <ClientExperienceAndEducationView
          educationData={educationSectionData || []}
          experienceData={experienceSectionData || []}
        />
        <ClientProjectView data={projectSectionData || []} />
        <ClientContactView />
      </div>
    );
  } catch (error) {
    console.error("Error loading section data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}