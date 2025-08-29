
  import connectToDB from "@/database";
  import Experience from "@/models/Experience";
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

      const deletedExperience = await Experience.findByIdAndDelete(id);
      if (!deletedExperience) {
        return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 });
      }

      const updatedExperiences = await Experience.find();
      return NextResponse.json({ success: true, data: updatedExperiences });
    } catch (e) {
      console.error("Error deleting experience:", e);
      return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
  }
  