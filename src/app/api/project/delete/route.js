
import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    // Validate id as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const updatedProjects = await Project.find(); // Fetch updated list
    return NextResponse.json({ success: true, data: updatedProjects });
  } catch (e) {
    console.error("Error deleting project:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
