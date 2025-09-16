import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  summary: { type: String, required: true },
}, { timestamps: true });

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);
export default Home;