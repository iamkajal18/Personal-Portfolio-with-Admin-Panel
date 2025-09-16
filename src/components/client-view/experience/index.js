// Component: ClientExperienceAndEducationView
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
      y: 80,
      opacity: 0,
      scale: 0.95,
    },
    onscreen: ({ duration = 1 } = {}) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration,
      },
    }),
  };
}

const timelineItemVariant = {
  hidden: { 
    x: -50, 
    opacity: 0,
    scale: 0.9,
    rotateY: -15
  },
  visible: { 
    x: 0, 
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { 
      duration: 0.6,
      type: "spring",
      bounce: 0.2
    } 
  },
};

const sectionVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function ClientExperienceAndEducationView({
  educationData,
  experienceData,
}) {
  console.log(educationData, experienceData, "ClientExperienceAndEducationView data");

  const setVariants = useMemo(() => variants(), []);

  return (
    <div
      className="relative max-w-screen-xl mt-16 mb-12 px-4 sm:px-8 xl:px-16 mx-auto"
      id="experience"
    >
      {/* Gradient Background with Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white/70 to-purple-50/50 dark:from-teal-900/30 dark:via-gray-900/50 dark:to-purple-900/30" />
        <div className="absolute top-20 -right-4 w-72 h-72 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute -bottom-8 -left-4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-teal-500/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Experience Section */}
      <motion.div
        className="mb-20"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AnimationWrapper className="py-8 sm:py-12">
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <motion.div 
              className="relative mb-6 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-8 py-4 rounded-2xl border border-teal-200/50 dark:border-purple-700/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight font-['Inter',_sans-serif] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                  {"Professional Experience".split(" ").map((item, index) => (
                    <motion.span
                      key={index}
                      className={`inline-block ${
                        index === 1
                          ? "bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                          : ""
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {item}{" "}
                    </motion.span>
                  ))}
                </h1>
              </div>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Journey through my professional milestones and career achievements
            </motion.p>
          </div>
        </AnimationWrapper>

        <AnimationWrapper>
          <div className="flex w-full justify-center">
            <motion.div className="w-full max-w-5xl" variants={setVariants}>
              <Timeline position="alternate">
                {experienceData && experienceData.length ? (
                  experienceData.map((experienceItem, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <motion.div
                          className="group"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <TimelineDot className="group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-purple-600 bg-teal-500 shadow-2xl border-4 border-white dark:border-gray-800 w-6 h-6 transition-all duration-300" />
                        </motion.div>
                        {index !== experienceData.length - 1 && (
                          <TimelineConnector className="bg-gradient-to-b from-teal-500 via-purple-600 to-indigo-600 w-1" />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div
                          className="group relative p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-teal-200/50 dark:border-purple-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 mt-4 overflow-hidden hover:bg-gradient-to-br hover:from-teal-500/5 hover:to-purple-600/5"
                          variants={timelineItemVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-500" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-2 h-8 bg-gradient-to-b from-teal-500 to-purple-600 rounded-full" />
                              <p className="text-sm font-bold text-teal-500 dark:text-purple-400 bg-teal-100/50 dark:bg-purple-900/30 px-3 py-1 rounded-full shadow-sm">
                                {experienceItem.duration}
                              </p>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-500 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                              {experienceItem.company}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="text-base sm:text-lg font-semibold text-purple-600 dark:text-purple-400">
                                {experienceItem.position}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {experienceItem.location}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base font-normal text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                              {experienceItem.jobprofile}
                            </p>
                            <div className="mt-4 flex gap-2">
                              <div className="w-8 h-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                              <div className="w-6 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                              <div className="w-4 h-1 bg-gradient-to-r from-indigo-600 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
                            </div>
                          </div>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  ))
                ) : (
                  <motion.p 
                    className="text-lg text-gray-600 dark:text-gray-300 text-center py-12 col-span-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No experience data available.
                  </motion.p>
                )}
              </Timeline>
            </motion.div>
          </div>
        </AnimationWrapper>
      </motion.div>

      {/* Education Section */}
      <motion.div
        className="mb-16"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AnimationWrapper className="py-8 sm:py-12">
          <div className="flex flex-col justify-center items-center text-center mb-12">
            <motion.div 
              className="relative mb-6 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-8 py-4 rounded-2xl border border-purple-200/50 dark:border-indigo-700/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight font-['Inter',_sans-serif] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                  {"Academic Journey".split(" ").map((item, index) => (
                    <motion.span
                      key={index}
                      className={`inline-block ${
                        index === 1
                          ? "bg-gradient-to-r from-purple-500 via-indigo-600 to-teal-500 bg-clip-text text-transparent"
                          : ""
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {item}{" "}
                    </motion.span>
                  ))}
                </h1>
              </div>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Educational foundations that shaped my expertise and knowledge
            </motion.p>
          </div>
        </AnimationWrapper>

        <AnimationWrapper>
          <div className="flex w-full justify-center">
            <motion.div className="w-full max-w-5xl" variants={setVariants}>
              <Timeline position="alternate">
                {educationData && educationData.length ? (
                  educationData.map((educationItem, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <motion.div
                          className="group"
                          whileHover={{ scale: 1.2, rotate: -360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <TimelineDot className="group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-indigo-600 bg-purple-500 shadow-2xl border-4 border-white dark:border-gray-800 w-6 h-6 transition-all duration-300" />
                        </motion.div>
                        {index !== educationData.length - 1 && (
                          <TimelineConnector className="bg-gradient-to-b from-purple-500 via-indigo-600 to-teal-500 w-1" />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div
                          className="group relative p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-purple-200/50 dark:border-indigo-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 mt-4 overflow-hidden hover:bg-gradient-to-br hover:from-purple-500/5 hover:to-indigo-600/5"
                          variants={timelineItemVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-500" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full" />
                              <p className="text-sm font-bold text-purple-500 dark:text-indigo-400 bg-purple-100/50 dark:bg-indigo-900/30 px-3 py-1 rounded-full shadow-sm">
                                {educationItem.year}
                              </p>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-500 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-tight">
                              {educationItem.college}
                            </h3>
                            <p className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400 leading-relaxed mb-4">
                              {educationItem.degree}
                            </p>
                            <div className="mt-4 flex gap-2">
                              <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                              <div className="w-6 h-1 bg-gradient-to-r from-indigo-600 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                              <div className="w-4 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
                            </div>
                          </div>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  ))
                ) : (
                  <motion.p 
                    className="text-lg text-gray-600 dark:text-gray-300 text-center py-12 col-span-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No education data available.
                  </motion.p>
                )}
              </Timeline>
            </motion.div>
          </div>
        </AnimationWrapper>
      </motion.div>
    </div>
  );
}