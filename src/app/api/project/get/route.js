import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const extractData = await Project.find({});

    if (extractData.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No project data found",
      });
    }
  } catch (e) {
    console.error("Error fetching Project data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch project data. Please try again later.",
      error: e.message,
    });
  }
}