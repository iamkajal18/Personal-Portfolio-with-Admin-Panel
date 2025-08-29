import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const { id, ...updateData } = await req.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "No ID provided for update",
      });
    }

    const updatedData = await Home.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedData) {
      return NextResponse.json({
        success: true,
        data: updatedData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No home data found for the provided ID",
      });
    }
  } catch (e) {
    console.error("Error updating Home data:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to update home data. Please try again later.",
      error: e.message,
    });
  }
}