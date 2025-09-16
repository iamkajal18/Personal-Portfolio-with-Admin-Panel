import connectToDB from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    console.log("Received data for add:", extractData); // Debug log
    const saveData = await About.create(extractData);

    if (saveData) {
      return NextResponse.json({
        success: true,
        message: "Data saved successfully",
        data: saveData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  } catch (e) {
    console.error("Error adding about data:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
      error: e.message,
    });
  }
}