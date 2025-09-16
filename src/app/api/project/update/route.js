import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const formData = await req.json();
    console.log("API - Received formData for update:", formData);

    if (!formData._id) {
      return NextResponse.json({
        success: false,
        message: "Missing project ID",
      }, { status: 400 });
    }

    // Ensure description is a string
    formData.description = formData.description || "";

    const updatedProject = await Project.findByIdAndUpdate(
      formData._id,
      { $set: formData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProject) {
      return NextResponse.json({
        success: false,
        message: "Project not found",
      }, { status: 404 });
    }

    console.log("API - Updated project:", updatedProject);

    return NextResponse.json({
      success: true,
      data: updatedProject,
    });
  } catch (e) {
    console.error("API - Error updating project:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to update project",
      error: e.message,
    }, { status: 500 });
  }
}