import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
    }

    const deletedHome = await Home.findByIdAndDelete(id);
    if (!deletedHome) {
      return NextResponse.json({ success: false, error: "Home entry not found" }, { status: 404 });
    }

    const updatedHome = await Home.find();
    console.log("Deleted home, remaining data:", updatedHome);
    return NextResponse.json({ success: true, data: updatedHome });
  } catch (e) {
    console.error("Error deleting home:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}