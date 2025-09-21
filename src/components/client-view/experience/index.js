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

const waveAnimation = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export default function ClientExperienceAndEducationView({
  educationData,
  experienceData,
}) {
  console.log(educationData, experienceData, "ClientExperienceAndEducationView data");

  const setVariants = useMemo(() => variants(), []);

  return (
    <div
      className="relative max-w-screen-xl mt-16 mb-12 px-4 sm:px-8 lg:px-16 mx-auto"
      id="experience"
    >
      {/* Unique Wave Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/10 via-white/70 to-[#3c6e71]/10 dark:from-[#3c6e71]/30 dark:via-gray-900/70 dark:to-[#3c6e71]/30" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q20,30 40,50 T80,50 T100,50 V100 H0 Z"
            fill="none"
            stroke="#3c6e71"
            strokeWidth="2"
            variants={waveAnimation}
            initial="initial"
            animate="animate"
          />
        </svg>
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
              className="relative mb-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#3c6e71]/20"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-['Inter',_sans-serif]">
                {"Professional Experience".split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index === 1
                        ? "text-[#3c6e71]"
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
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.4 }}
                        >
                          <TimelineDot className="bg-[#3c6e71] shadow-md border-4 border-white dark:border-gray-800 w-5 h-5 transition-all duration-300" />
                        </motion.div>
                        {index !== experienceData.length - 1 && (
                          <TimelineConnector className="bg-[#3c6e71]/50 w-1" />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div
                          className="relative p-6 sm:p-8 mt-4 text-left"
                          variants={timelineItemVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#3c6e71]/10"
                            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-[#3c6e71] rounded-full" />
                            <p className="text-sm font-bold text-[#3c6e71] bg-[#3c6e71]/10 px-3 py-1 rounded-full shadow-sm">
                              {experienceItem.duration}
                            </p>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-gray-100 mb-2 leading-tight">
                            {experienceItem.company}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-base sm:text-lg font-semibold text-[#3c6e71]">
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
                          <div className="flex gap-2">
                            <motion.div
                              className="w-8 h-1 bg-[#3c6e71]/50 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div
                              className="w-6 h-1 bg-[#3c6e71]/50 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                              className="w-4 h-1 bg-[#3c6e71]/50 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                            />
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
              className="relative mb-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#3c6e71]/20"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-['Inter',_sans-serif]">
                {"Academic Journey".split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index === 1
                        ? "text-[#3c6e71]"
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
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.4 }}
                        >
                          <TimelineDot className="bg-[#3c6e71] shadow-md border-4 border-white dark:border-gray-800 w-5 h-5 transition-all duration-300" />
                        </motion.div>
                        {index !== educationData.length - 1 && (
                          <TimelineConnector className="bg-[#3c6e71]/50 w-1" />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div
                          className="relative p-6 sm:p-8 mt-4 text-left"
                          variants={timelineItemVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#3c6e71]/10"
                            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-[#3c6e71] rounded-full" />
                            <p className="text-sm font-bold text-[#3c6e71] bg-[#3c6e71]/10 px-3 py-1 rounded-full shadow-sm">
                              {educationItem.year}
                            </p>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-gray-100 mb-2 leading-tight">
                            {educationItem.college}
                          </h3>
                          <p className="text-base sm:text-lg font-semibold text-[#3c6e71] leading-relaxed mb-4">
                            {educationItem.degree}
                          </p>
                          <div className="flex gap-2">
                            <motion.div
                              className="w-8 h-1 bg-[#3c6e71]/50 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div
                              className="w-6 h-1 bg-[#3c6e71]/50 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                              className="w-4 h-1 bg-[#3c6e71]/50 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                            />
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
