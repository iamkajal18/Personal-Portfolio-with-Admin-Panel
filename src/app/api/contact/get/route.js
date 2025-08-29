import connectToDB from "@/database";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const extractData = await Contact.find({});

    if (extractData.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No contact data found",
      });
    }
  } catch (e) {
    console.error("Error fetching Contact data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch contact data. Please try again later.",
      error: e.message,
    });
  }
}