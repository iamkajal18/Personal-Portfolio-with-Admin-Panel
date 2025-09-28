import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    console.log("Database connected successfully");
    const extractData = await Home.find({});
    console.log("Fetched home data:", extractData);

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
    console.error("Error fetching home data:", e.stack); 
    return NextResponse.json({
      success: false,
      message: "Failed to fetch home data. Please try again later.",
      error: e.message,
    }, { status: 500 });
  }
}