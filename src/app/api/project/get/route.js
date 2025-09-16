import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const extractData = await Project.find({}).lean();
    console.log("API - Fetched project data:", extractData);

    if (extractData.length > 0) {
      // Ensure description is always a string
      const sanitizedData = extractData.map((item) => ({
        ...item,
        description: item.description || "",
      }));
      return NextResponse.json({
        success: true,
        data: sanitizedData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No project data found",
      });
    }
  } catch (e) {
    console.error("API - Error fetching Project data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch project data. Please try again later.",
      error: e.message,
    }, { status: 500 });
  }
}