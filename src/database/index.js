import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully"); // Debug log
  } catch (e) {
    console.error("Database connection error:", e); // Debug log
    throw e; // Rethrow to propagate error
  }
}