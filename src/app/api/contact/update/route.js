import connectToDB from "@/database";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const { _id, name, email, message } = extractData;

    // Validate required fields
    if (!_id || !name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: _id, name, email, or message",
      });
    }

    const updateData = await Contact.findOneAndUpdate(
      { _id },
      { name, email, message },
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
        message: "Contact not found",
      });
    }
  } catch (e) {
    console.error("Error updating contact:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}