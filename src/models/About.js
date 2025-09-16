import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    aboutme: String,
    noofprojects: Number,
    yearofexperience: Number,
    noofclients: Number,
    skills: String,
  },
  { timestamps: true }
);

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;