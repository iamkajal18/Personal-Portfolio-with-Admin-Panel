import connectToDB from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const extractData = await About.find({});
    console.log("Fetched about data:", extractData); // Debug log

    if (extractData.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No about data found",
      });
    }
  } catch (e) {
    console.error("Error fetching about data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch about data. Please try again later.",
      error: e.message,
    });
  }
}