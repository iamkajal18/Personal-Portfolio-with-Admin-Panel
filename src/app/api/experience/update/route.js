import connectToDB from "@/database";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const { _id, position, company, duration, location, jobprofile } = extractData;

    // Validate required fields
    if (!_id || !position || !company || !duration || !location || !jobprofile) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: _id, position, company, duration, location, or jobprofile",
      });
    }

    const updateData = await Experience.findOneAndUpdate(
      { _id },
      { position, company, duration, location, jobprofile },
      { new: true, runValidators: true }
    );

    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "Updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Experience entry not found",
      });
    }
  } catch (e) {
    console.error("Error updating experience:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}