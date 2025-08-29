import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const { _id, degree, year, college } = extractData;

    // Validate required fields
    if (!_id || !degree || !year || !college) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: _id, degree, year, or college",
      });
    }

    const updateData = await Education.findOneAndUpdate(
      { _id },
      { degree, year, college },
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
        message: "Education entry not found",
      });
    }
  } catch (e) {
    console.error("Error updating education:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}