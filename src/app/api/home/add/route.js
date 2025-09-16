import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    console.log("Received data for add:", extractData);
    const saveData = await Home.create(extractData);

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
    console.error("Error adding home data:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
      error: e.message,
    });
  }
}