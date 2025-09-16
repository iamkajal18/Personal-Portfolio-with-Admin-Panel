import connectToDB from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const { _id, aboutme, noofprojects, yearofexperience, noofclients, skills } = extractData;
    console.log("Received data for update:", extractData); // Debug log

    // Validate required fields
    if (!_id || !aboutme || !noofprojects || !yearofexperience || !noofclients || !skills) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: _id, aboutme, noofprojects, yearofexperience, noofclients, or skills",
      });
    }

    const updateData = await About.findOneAndUpdate(
      { _id },
      { aboutme, noofprojects, yearofexperience, noofclients, skills },
      { new: true, runValidators: true }
    );

    if (updateData) {
      console.log("Updated about data:", updateData); // Debug log
      return NextResponse.json({
        success: true,
        message: "Updated successfully",
        data: updateData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "About entry not found",
      });
    }
  } catch (e) {
    console.error("Error updating about:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
      error: e.message,
    });
  }
}