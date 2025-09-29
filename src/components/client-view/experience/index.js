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
import { useMediaQuery } from "@mui/material";

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

// Mobile-specific variants
const mobileTimelineItemVariant = {
  hidden: { 
    y: 30, 
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5,
      type: "spring",
      bounce: 0.3
    } 
  },
};

export default function ClientExperienceAndEducationView({
  educationData,
  experienceData,
}) {
  console.log(educationData, experienceData, "ClientExperienceAndEducationView data");

  const setVariants = useMemo(() => variants(), []);
  
  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');

  // Responsive timeline position
  const timelinePosition = isMobile ? "right" : "alternate";

  return (
    <div
      className="relative w-full mt-8 mb-8 px-4 sm:px-6 md:px-8 lg:px-16 mx-auto"
      id="experience"
    >
      {/* Enhanced Wave Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/10 via-white/70 to-[#3c6e71]/10 dark:from-[#3c6e71]/30 dark:via-gray-900/70 dark:to-[#3c6e71]/30" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d={isMobile ? "M0,60 Q25,40 50,60 T100,60 V100 H0 Z" : "M0,50 Q20,30 40,50 T80,50 T100,50 V100 H0 Z"}
            fill="none"
            stroke="#3c6e71"
            strokeWidth={isMobile ? "1" : "2"}
            variants={waveAnimation}
            initial="initial"
            animate="animate"
          />
        </svg>
      </div>

      {/* Experience Section */}
      <motion.div
        className="mb-16 md:mb-20"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
      >
        <AnimationWrapper className="py-6 sm:py-8 md:py-12">
          <div className="flex flex-col justify-center items-center text-center mb-8 md:mb-12">
            <motion.div 
              className="relative mb-4 md:mb-6"
              whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#3c6e71]/20 rounded-lg"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2], 
                  scale: [1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-['Inter',_sans-serif] px-4">
                {"Professional Experience".split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index === 1 ? "text-[#3c6e71]" : ""
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
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed px-4"
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
            <motion.div 
              className="w-full max-w-4xl lg:max-w-5xl" 
              variants={setVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Timeline position={timelinePosition}>
                {experienceData && experienceData.length ? (
                  experienceData.map((experienceItem, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <motion.div
                          className="group"
                          whileHover={{ scale: isMobile ? 1.1 : 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TimelineDot 
                            className="bg-[#3c6e71] shadow-md border-4 border-white dark:border-gray-800 w-4 h-4 md:w-5 md:h-5 transition-all duration-300" 
                          />
                        </motion.div>
                        {index !== experienceData.length - 1 && (
                          <TimelineConnector className="bg-[#3c6e71]/50 w-1" />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div
                          className="relative p-4 sm:p-6 md:p-8 mt-2 md:mt-4 text-left"
                          variants={isMobile ? mobileTimelineItemVariant : timelineItemVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: isMobile ? "-50px" : "0px" }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            y: isMobile ? -2 : -5, 
                            scale: isMobile ? 1.01 : 1.02 
                          }}
                        >
                          {/* Animated background */}
                          <motion.div
                            className="absolute inset-0 bg-[#3c6e71]/10 rounded-xl"
                            animate={{ 
                              opacity: [0.1, 0.2, 0.1], 
                              scale: [1, 1.01, 1] 
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                              <div className="w-1.5 md:w-2 h-6 md:h-8 bg-[#3c6e71] rounded-full" />
                              <p className="text-xs md:text-sm font-bold text-[#3c6e71] bg-[#3c6e71]/10 px-2 md:px-3 py-1 rounded-full shadow-sm">
                                {experienceItem.duration}
                              </p>
                            </div>
                            
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#000000] dark:text-gray-100 mb-1 md:mb-2 leading-tight">
                              {experienceItem.company}
                            </h3>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2 md:mb-3">
                              <span className="text-base sm:text-lg font-semibold text-[#3c6e71]">
                                {experienceItem.position}
                              </span>
                              <span className="hidden sm:inline text-gray-400">•</span>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {experienceItem.location}
                              </span>
                            </div>
                            
                            <p className="text-xs sm:text-sm md:text-base font-normal text-gray-600 dark:text-gray-300 leading-relaxed mb-3 md:mb-4">
                              {experienceItem.jobprofile}
                            </p>
                            
                            {/* Animated dots */}
                            <div className="flex gap-1 md:gap-2">
                              <motion.div
                                className="w-6 md:w-8 h-0.5 md:h-1 bg-[#3c6e71]/50 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <motion.div
                                className="w-4 md:w-6 h-0.5 md:h-1 bg-[#3c6e71]/50 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              />
                              <motion.div
                                className="w-3 md:w-4 h-0.5 md:h-1 bg-[#3c6e71]/50 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  ))
                ) : (
                  <motion.p 
                    className="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center py-8 md:py-12 col-span-full"
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
        className="mb-12 md:mb-16"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
      >
        <AnimationWrapper className="py-6 sm:py-8 md:py-12">
          <div className="flex flex-col justify-center items-center text-center mb-8 md:mb-12">
            <motion.div 
              className="relative mb-4 md:mb-6"
              whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#3c6e71]/20 rounded-lg"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2], 
                  scale: [1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-['Inter',_sans-serif] px-4">
                {"Academic Journey".split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index === 1 ? "text-[#3c6e71]" : ""
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
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed px-4"
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
            <motion.div 
              className="w-full max-w-4xl lg:max-w-5xl" 
              variants={setVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Timeline position={timelinePosition}>
                {educationData && educationData.length ? (
                  educationData.map((educationItem, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <motion.div
                          className="group"
                          whileHover={{ scale: isMobile ? 1.1 : 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TimelineDot 
                            className="bg-[#3c6e71] shadow-md border-4 border-white dark:border-gray-800 w-4 h-4 md:w-5 md:h-5 transition-all duration-300" 
                          />
                        </motion.div>
                        {index !== educationData.length - 1 && (
                          <TimelineConnector className="bg-[#3c6e71]/50 w-1" />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div
                          className="relative p-4 sm:p-6 md:p-8 mt-2 md:mt-4 text-left"
                          variants={isMobile ? mobileTimelineItemVariant : timelineItemVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: isMobile ? "-50px" : "0px" }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            y: isMobile ? -2 : -5, 
                            scale: isMobile ? 1.01 : 1.02 
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#3c6e71]/10 rounded-xl"
                            animate={{ 
                              opacity: [0.1, 0.2, 0.1], 
                              scale: [1, 1.01, 1] 
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                              <div className="w-1.5 md:w-2 h-6 md:h-8 bg-[#3c6e71] rounded-full" />
                              <p className="text-xs md:text-sm font-bold text-[#3c6e71] bg-[#3c6e71]/10 px-2 md:px-3 py-1 rounded-full shadow-sm">
                                {educationItem.year}
                              </p>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#000000] dark:text-gray-100 mb-1 md:mb-2 leading-tight">
                              {educationItem.college}
                            </h3>
                            <p className="text-base sm:text-lg font-semibold text-[#3c6e71] leading-relaxed mb-3 md:mb-4">
                              {educationItem.degree}
                            </p>
                            <div className="flex gap-1 md:gap-2">
                              <motion.div
                                className="w-6 md:w-8 h-0.5 md:h-1 bg-[#3c6e71]/50 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <motion.div
                                className="w-4 md:w-6 h-0.5 md:h-1 bg-[#3c6e71]/50 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              />
                              <motion.div
                                className="w-3 md:w-4 h-0.5 md:h-1 bg-[#3c6e71]/50 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  ))
                ) : (
                  <motion.p 
                    className="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center py-8 md:py-12 col-span-full"
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