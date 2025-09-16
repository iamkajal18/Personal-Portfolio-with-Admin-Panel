import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const { _id, heading, summary } = extractData;
    console.log("Received data for update:", extractData);

    // Validate required fields
    if (!_id || !heading || !summary) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: _id, heading, or summary",
      });
    }

    const updateData = await Home.findOneAndUpdate(
      { _id },
      { heading, summary },
      { new: true, runValidators: true }
    );

    if (updateData) {
      console.log("Updated home data:", updateData);
      return NextResponse.json({
        success: true,
        message: "Updated successfully",
        data: updateData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Home entry not found",
      });
    }
  } catch (e) {
    console.error("Error updating home:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
      error: e.message,
    });
  }
}