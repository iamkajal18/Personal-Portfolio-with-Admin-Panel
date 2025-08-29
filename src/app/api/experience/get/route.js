import connectToDB from "@/database";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const extractData = await Experience.find({});

    if (extractData.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No experience data found",
      });
    }
  } catch (e) {
    console.error("Error fetching Experience data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch experience data. Please try again later.",
      error: e.message,
    });
  }
}