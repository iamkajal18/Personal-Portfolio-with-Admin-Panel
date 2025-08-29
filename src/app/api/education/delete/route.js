  import connectToDB from "@/database";
  import Education from "@/models/Education";
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

      const deletedEducation = await Education.findByIdAndDelete(id);
      if (!deletedEducation) {
        return NextResponse.json({ success: false, error: "Education not found" }, { status: 404 });
      }

      const updatedEducations = await Education.find();
      return NextResponse.json({ success: true, data: updatedEducations });
    } catch (e) {
      console.error("Error deleting education:", e);
      return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
  }
