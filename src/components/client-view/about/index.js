// Component: ClientAboutView
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
      className="relative max-w-screen-xl mt-12 mb-8 px-4 sm:px-8 xl:px-12 mx-auto"
      id="about"
    >
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-white/50 to-purple-600/5 dark:from-teal-900/20 dark:via-gray-900/50 dark:to-purple-900/20 rounded-3xl -z-10" />

      {/* Stats Section */}
      <AnimationWrapper className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
        {aboutDataInfo.map((infoItem, index) => (
          <motion.div
            key={index}
            className="group flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-teal-200/50 dark:border-purple-700/50 hover:border-teal-500/70 dark:hover:border-purple-500/70 transition-all duration-500 hover:bg-gradient-to-br hover:from-teal-500/10 hover:to-purple-600/10"
            custom={{ duration: 1 + index * 0.15 }}
            variants={setVariants}
          >
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              {infoItem.value}+
            </p>
            <p className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
              {infoItem.label}
            </p>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </AnimationWrapper>

      {/* Heading + Profession + About Me */}
      <AnimationWrapper className="pt-8 sm:pt-12">
        <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight font-['Inter',_sans-serif] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
            {headingText.split(" ").map((item, index) => (
              <motion.span
                key={index}
                className={`inline-block ${
                  index === 6
                    ? "bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
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
          <p className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {data?.profession || "Professional Innovator"}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2 mb-8 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
            {data?.aboutme ||
              "I bring expertise and passion to deliver cutting-edge solutions tailored to your needs."}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full mx-auto" />
        </div>
      </AnimationWrapper>

      {/* Image + Skills Section */}
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
        {/* Image */}
        <AnimationWrapper className="flex w-full">
          <motion.div variants={setVariants} className="relative w-full p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-600/20 rounded-2xl shadow-inner opacity-80 transition-all duration-500 hover:opacity-100" />
            <Image
              src={aboutMeImage}
              alt="About Me"
              layout="responsive"
              height={414}
              width={508}
              quality={90}
              className="rounded-2xl border-2 border-white/50 dark:border-gray-700/50 shadow-xl object-cover"
            />
            <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Expertise
            </div>
          </motion.div>
        </AnimationWrapper>

        {/* Skills */}
        <AnimationWrapper className="flex items-center w-full p-4">
          <motion.div
            variants={setVariants}
            className="grid gap-3 grid-cols-2 sm:grid-cols-3 h-full max-h-[200px] w-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-teal-200/30 dark:border-purple-700/30"
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
                  <button className="group whitespace-nowrap text-ellipsis overflow-hidden py-2 px-4 border border-teal-200/50 dark:border-purple-700/50 bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-200 font-medium rounded-xl text-xs sm:text-sm tracking-wide hover:bg-gradient-to-r hover:from-teal-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-400 shadow-sm hover:shadow-md hover:scale-105">
                    {skill.trim()}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10" />
                  </button>
                </motion.div>
              ))}
          </motion.div>
        </AnimationWrapper>
      </div>
    </div>
  );
}