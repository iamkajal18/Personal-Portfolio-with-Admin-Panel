 import connectToDB from "@/database";
  import About from "@/models/About";
  import { NextResponse } from "next/server";
  import mongoose from "mongoose";

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

      const deletedAbout = await About.findByIdAndDelete(id);
      if (!deletedAbout) {
        return NextResponse.json({ success: false, error: "About not found" }, { status: 404 });
      }

      const updatedAbouts = await About.find();
      return NextResponse.json({ success: true, data: updatedAbouts });
    } catch (e) {
      console.error("Error deleting about:", e);
      return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
  }