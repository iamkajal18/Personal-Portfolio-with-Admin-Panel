import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const extractData = await Education.find({});

    if (extractData.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No education data found",
      });
    }
  } catch (e) {
    console.error("Error fetching Education data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch education data. Please try again later.",
      error: e.message,
    });
  }
}