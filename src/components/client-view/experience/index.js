"use client";

import { useMemo } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";

function variants() {
  return {
    offscreen: {
      y: 60,
      opacity: 0,
    },
    onscreen: ({ duration = 0.8 } = {}) => ({
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

const timelineItemVariant = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function ClientExperienceAndEducationView({
  educationData,
  experienceData,
}) {
  console.log(educationData, experienceData, "experienceData");

  const setVariants = useMemo(() => variants(), []);

  return (
    <div
      className="relative max-w-screen-xl mt-12 mb-8 px-4 sm:px-8 xl:px-12 mx-auto"
      id="experience"
    >
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/3 via-white to-purple-600/3 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />

      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Experience Section */}
        <div className="flex flex-col gap-4">
          <AnimationWrapper className="py-6 sm:py-10">
            <div className="flex flex-col justify-center items-center text-center">
              <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight font-['Inter',_sans-serif]">
                {"My Experience".split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`${
                      index === 1
                        ? "bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-900 dark:text-white"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                  >
                    {item}{" "}
                  </motion.span>
                ))}
              </h1>
            </div>
          </AnimationWrapper>
          <AnimationWrapper>
            <div className="flex w-full">
              <motion.div className="w-full" variants={setVariants}>
                <Timeline position="right">
                  {experienceData && experienceData.length ? (
                    experienceData.map((experienceItem, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot className="bg-gradient-to-r from-teal-500 to-purple-600 shadow-md" />
                          <TimelineConnector className="bg-gradient-to-b from-teal-500 to-purple-600" />
                        </TimelineSeparator>
                        <TimelineContent>
                          <motion.div
                            className="p-4 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-gradient-to-r hover:from-teal-500 hover:to-purple-600 shadow-sm hover:shadow-md transition-all duration-300 mt-2 ml-4"
                            variants={timelineItemVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                          >
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {experienceItem.duration}
                            </p>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mt-1">
                              {experienceItem.company}, {experienceItem.location}
                            </h3>
                            <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100 mt-1">
                              {experienceItem.position}
                            </p>
                            <p className="text-xs sm:text-sm font-normal text-gray-600 dark:text-gray-300 mt-1">
                              {experienceItem.jobprofile}
                            </p>
                          </motion.div>
                        </TimelineContent>
                      </TimelineItem>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                      No experience data available.
                    </p>
                  )}
                </Timeline>
              </motion.div>
            </div>
          </AnimationWrapper>
        </div>

        {/* Education Section */}
        <div className="flex flex-col gap-4">
          <AnimationWrapper className="py-6 sm:py-10">
            <div className="flex flex-col justify-center items-center text-center">
              <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight font-['Inter',_sans-serif]">
                {"My Education".split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`${
                      index === 1
                        ? "bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-900 dark:text-white"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                  >
                    {item}{" "}
                  </motion.span>
                ))}
              </h1>
            </div>
          </AnimationWrapper>
          <AnimationWrapper>
            <div className="flex w-full">
              <motion.div className="w-full" variants={setVariants}>
                <Timeline position="right">
                  {educationData && educationData.length ? (
                    educationData.map((educationItem, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot className="bg-gradient-to-r from-teal-500 to-purple-600 shadow-md" />
                          <TimelineConnector className="bg-gradient-to-b from-teal-500 to-purple-600" />
                        </TimelineSeparator>
                        <TimelineContent>
                          <motion.div
                            className="p-4 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-gradient-to-r hover:from-teal-500 hover:to-purple-600 shadow-sm hover:shadow-md transition-all duration-300 mt-2 ml-4"
                            variants={timelineItemVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                          >
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {educationItem.year}
                            </p>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mt-1">
                              {educationItem.college}
                            </h3>
                            <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100 mt-1">
                              {educationItem.degree}
                            </p>
                          </motion.div>
                        </TimelineContent>
                      </TimelineItem>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                      No education data available.
                    </p>
                  )}
                </Timeline>
              </motion.div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
}