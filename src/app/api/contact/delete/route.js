
  import connectToDB from "@/database";
  import Contact from "@/models/Contact";
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

      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 });
      }

      const updatedContacts = await Contact.find();
      return NextResponse.json({ success: true, data: updatedContacts });
    } catch (e) {
      console.error("Error deleting contact:", e);
      return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
  }
  