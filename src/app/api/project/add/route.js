import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.json();
    console.log("API - Received formData for add:", formData);

    if (!formData.name) {
      return NextResponse.json({
        success: false,
        message: "Project name is required",
      }, { status: 400 });
    }

    // Ensure description is a string (even if empty)
    formData.description = formData.description || "";

    const newProject = await Project.create(formData);
    console.log("API - Saved project:", newProject);

    return NextResponse.json({
      success: true,
      data: newProject,
    });
  } catch (e) {
    console.error("API - Error adding project:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to add project",
      error: e.message,
    }, { status: 500 });
  }
}