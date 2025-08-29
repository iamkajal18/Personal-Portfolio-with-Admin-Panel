import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const extractData = await Home.find({});

    if (extractData.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No home data found",
      });
    }
  } catch (e) {
    console.error("Error fetching Home data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch home data. Please try again later.",
      error: e.message,
    });
  }
}