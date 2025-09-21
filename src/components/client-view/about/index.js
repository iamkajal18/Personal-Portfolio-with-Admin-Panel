"use client";

import { useMemo } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import aboutMeImage from "../../../assets/about-image.png";

function variants() {
  return {
    offscreen: {
      y: 80,
      opacity: 0,
    },
    onscreen: ({ duration = 1 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration,
      },
    }),
  };
}

const skillItemVariant = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ClientAboutView({ data }) {
  console.log(data, "ClientAboutView data");

  const setVariants = useMemo(() => variants(), []);

  const aboutDataInfo = [
    {
      label: "Clients",
      value: data?.noofclients || "0",
    },
    {
      label: "Projects",
      value: data?.noofprojects || "0",
    },
    {
      label: "Years of Experience",
      value: data?.yearofexperience || "0",
    },
  ];

  const headingText = "Why Hire Me For Your Next Project?";

  return (
    <div
      className="relative max-w-screen-xl mt-12 mb-8 px-4 sm:px-8 lg:px-12 mx-auto"
      id="about"
    >
      {/* Subtle Circular Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/10 via-white/60 to-[#3c6e71]/10 dark:from-[#3c6e71]/30 dark:via-gray-900/60 dark:to-[#3c6e71]/30 rounded-full -z-10" />

      {/* Stats Section */}
      <AnimationWrapper className="w-full flex justify-around py-8">
        {aboutDataInfo.map((infoItem, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center"
            custom={{ duration: 1 + index * 0.15 }}
            variants={setVariants}
          >
            <p className="text-3xl sm:text-4xl font-bold text-[#3c6e71] mb-2">
              {infoItem.value}+
            </p>
            <p className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">
              {infoItem.label}
            </p>
          </motion.div>
        ))}
      </AnimationWrapper>

      {/* Heading + Profession + About Me */}
      <AnimationWrapper className="pt-8 sm:pt-12">
        <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-['Inter',_sans-serif]">
            {headingText.split(" ").map((item, index) => (
              <motion.span
                key={index}
                className={`inline-block ${
                  index === 6
                    ? "text-[#3c6e71]"
                    : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
              >
                {item}{" "}
              </motion.span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-[#3c6e71] mb-4">
            {data?.profession || "Professional Innovator"}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2 mb-8 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
            {data?.aboutme ||
              "I bring expertise and passion to deliver cutting-edge solutions tailored to your needs."}
          </p>
          <div className="w-24 h-1 bg-[#3c6e71] rounded-full mx-auto" />
        </div>
      </AnimationWrapper>

      {/* Image + Skills Section */}
      <div className="flex flex-col lg:flex-row gap-12 mt-12 justify-center items-center">
        {/* Image */}
        <AnimationWrapper className="flex justify-center w-full">
          <motion.div variants={setVariants} className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/20 to-[#3c6e71]/10 rounded-full shadow-lg opacity-80 transition-all duration-500 hover:opacity-100" />
            <Image
              src={aboutMeImage}
              alt="About Me"
              width={400}
              height={400}
              className="rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-lg transition-all duration-500 hover:shadow-xl"
              priority
            />
            <div className="absolute top-4 left-4 bg-[#3c6e71] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              Expertise
            </div>
          </motion.div>
        </AnimationWrapper>

        {/* Skills */}
        <AnimationWrapper className="flex items-center w-full p-4">
          <motion.div
            variants={setVariants}
            className="grid gap-3 grid-cols-2 sm:grid-cols-3 h-full max-h-[200px] w-full"
          >
            {(data?.skills || "")
              .split(",")
              .filter(Boolean)
              .map((skill, index) => (
                <motion.div
                  key={index}
                  className="w-full flex justify-center items-center"
                  variants={skillItemVariant}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.05 }}
                >
                  <button className="group whitespace-nowrap text-ellipsis overflow-hidden py-2 px-4 bg-white/70 dark:bg-gray-800/70 text-[#000000] dark:text-gray-200 font-medium rounded-full text-xs sm:text-sm tracking-wide hover:bg-[#3c6e71] hover:text-white transition-all duration-400 shadow-sm hover:shadow-md hover:scale-105">
                    {skill.trim()}
                  </button>
                </motion.div>
              ))}
          </motion.div>
        </AnimationWrapper>
      </div>
    </div>
  );
}
