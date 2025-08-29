import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(body._id, body, { new: true });
    return NextResponse.json({ success: true, data: updatedProject });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
