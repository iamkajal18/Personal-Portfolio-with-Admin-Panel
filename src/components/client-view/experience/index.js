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

const baseTimelineItemVariant = {
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

// Unified responsive variants with screen-based adjustments
const getTimelineItemVariant = (isMobile) => ({
  ...baseTimelineItemVariant,
  hidden: { 
    ...(isMobile ? { y: 30, opacity: 0, scale: 0.95 } : baseTimelineItemVariant.hidden),
  },
  visible: { 
    ...(isMobile ? { y: 0, opacity: 1, scale: 1 } : baseTimelineItemVariant.visible),
    transition: { 
      duration: isMobile ? 0.5 : 0.6,
      type: "spring",
      bounce: isMobile ? 0.3 : 0.2
    } 
  },
});

// Enhanced responsive animations with uniform feel
const floatingParticles = {
  animate: (i, isMobile) => ({
    y: [0, isMobile ? -20 : -30, 0],
    x: [0, Math.sin(i) * (isMobile ? 10 : 20), 0],
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    transition: {
      duration: 6 + i * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.5
    }
  })
};

const shimmerAnimation = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut"
    }
  }
};

const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(60, 110, 113, 0.4)",
      "0 0 0 10px rgba(60, 110, 113, 0)",
      "0 0 0 0 rgba(60, 110, 113, 0)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeOut"
    }
  }
};

const textGlitch = {
  normal: { 
    x: 0, 
    y: 0,
    opacity: 1 
  },
  glitch: {
    x: [0, -2, 2, -2, 0],
    y: [0, 1, -1, 1, 0],
    opacity: [1, 0.8, 0.9, 0.8, 1],
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const getCardHover = (isMobile) => ({
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: isMobile ? 1.01 : 1.02,
    rotateX: isMobile ? 0 : 2,
    rotateY: isMobile ? 0 : 2,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
});

const connectorFlow = {
  initial: { scaleY: 0, originY: 0 },
  animate: { 
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.5
    }
  }
};

const rippleEffect = {
  initial: { scale: 0, opacity: 1 },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const getLetterAnimation = (isMobile) => ({
  initial: { 
    y: isMobile ? 30 : 50, 
    opacity: 0,
    ...(isMobile ? {} : { rotateX: 90 })
  },
  animate: {
    y: 0,
    opacity: 1,
    ...(isMobile ? {} : { rotateX: 0 }),
    transition: {
      duration: isMobile ? 0.4 : 0.6,
      ease: isMobile ? "easeOut" : "backOut"
    }
  }
});

export default function ClientExperienceAndEducationView({
  educationData,
  experienceData,
}) {
  console.log(educationData, experienceData, "ClientExperienceAndEducationView data");

  const setVariants = useMemo(() => variants(), []);
  
  // Refined responsive breakpoints for uniform scaling
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const isMobileOrTablet = useMediaQuery('(max-width:1024px)');
  const isDesktop = useMediaQuery('(min-width:1025px)');

  // Unified timeline position: alternate on desktop, right on smaller for better flow
  const timelinePosition = isMobileOrTablet ? "right" : "alternate";

  // Unified gradients with subtle responsiveness
  const getGradient = (baseColorOpacity = 0.08, isMobile = false) => 
    `linear-gradient(135deg, rgba(60, 110, 113, ${isMobile ? baseColorOpacity + 0.04 : baseColorOpacity}) 0%, rgba(255, 255, 255, ${isMobile ? 0.98 : 0.9}) ${isMobile ? '100%' : '50%'}, rgba(60, 110, 113, ${baseColorOpacity}) 100%)`;
  
  const experienceGradient = getGradient(0.05, isMobileOrTablet);
  const educationGradient = getGradient(0.08, isMobileOrTablet);

  // Unified text splitter with responsive hover
  const splitText = (text) => {
    const letterAnim = getLetterAnimation(isMobileOrTablet);
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterAnim}
        className="inline-block"
        whileHover={{ 
          scale: isMobileOrTablet ? 1.1 : 1.2, 
          y: isMobileOrTablet ? -1 : -2,
          color: "#3c6e71",
          transition: { duration: 0.2 }
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  // Helper for responsive sizes (scale uniformly)
  const getResponsiveSize = (small, medium, large) => 
    isSmallMobile ? small : isMobileOrTablet ? medium : large;

  const getResponsiveClass = (baseClass) => {
    // This can be extended for more dynamic classes, but keeping Tailwind for now
    return baseClass;
  };

  return (
    <div
      className="relative w-full mt-2 xs:mt-4 sm:mt-6 md:mt-8 lg:mt-10 mb-4 xs:mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 mx-auto max-w-7xl overflow-x-hidden"
      id="experience"
    >
      {/* Unified Animated Background with scaled effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Unified orbs with responsive scale */}
        <motion.div
          className={`absolute top-1/4 left-1/4 w-64 h-64 blur-3xl bg-[#3c6e71] rounded-full opacity-10 ${getResponsiveClass('scale-75 scale-90')}`}
          animate={{
            scale: [1, 1.2, 1],
            x: isMobileOrTablet ? [0, 20, 0] : [0, 50, 0],
            y: isMobileOrTablet ? [0, -15, 0] : [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 blur-2xl bg-[#3c6e71] rounded-full opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            x: isMobileOrTablet ? [0, -15, 0] : [0, -30, 0],
            y: isMobileOrTablet ? [0, 20, 0] : [0, 40, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Unified particles: same count, but smaller motion on mobile */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-[#3c6e71] ${
              i % 4 === 0 ? `w-1 h-1 opacity-20` : 
              i % 4 === 1 ? `w-1.5 h-1.5 opacity-15` : 
              i % 4 === 2 ? `w-0.5 h-0.5 opacity-25` :
              `w-2 h-2 opacity-10`
            } ${getResponsiveClass(isMobileOrTablet ? 'scale-75' : '')}`}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            custom={[i, isMobileOrTablet]}
            variants={floatingParticles}
            animate="animate"
          />
        ))}

        {/* Unified grid pattern: always present, but lighter on mobile */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern 
                id="grid" 
                width={isMobileOrTablet ? "60" : "40"} 
                height={isMobileOrTablet ? "60" : "40"} 
                patternUnits="userSpaceOnUse"
              >
                <motion.path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-[#3c6e71]" />
          </svg>
        </div>

        {/* Unified wave: responsive height but same curve feel */}
        <svg className={`w-full h-20 sm:h-28 md:h-36 lg:h-44`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C200,40 400,80 600,60 C800,40 1000,80 1200,60 L1200,120 L0,120 Z"
            fill="rgba(60, 110, 113, 0.03)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* Experience Section - Unified structure */}
      <motion.div
        className="mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobileOrTablet ? 0.1 : 0.2 }}
      >
        <AnimationWrapper className="py-3 xs:py-4 sm:py-5 md:py-6 lg:py-8">
          <div className="flex flex-col justify-center items-center text-center mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            <motion.div 
              className="relative mb-2 xs:mb-3 sm:mb-4 md:mb-5"
              whileHover="glitch"
              variants={textGlitch}
            >
              {/* Shimmer: always present, but subtler on mobile */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 z-20"
                style={{ opacity: isMobileOrTablet ? 0.7 : 1 }}
                variants={shimmerAnimation}
                initial="initial"
                animate="animate"
              />
              
              <motion.div
                className={`absolute ${getResponsiveSize('-inset-1', '-inset-2', '-inset-3')} bg-[#3c6e71]/20 rounded-2xl blur-sm`}
                variants={pulseGlow}
                animate="animate"
              />
              
              <div className="relative">
                <motion.h1 
                  className={`font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-['Inter',_sans-serif] px-2 xs:px-3 overflow-hidden ${
                    getResponsiveSize('text-lg xs:text-xl', 'text-2xl sm:text-3xl', 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl')
                  }`}
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {splitText("Professional Experience")}
                </motion.h1>
                
                <motion.div
                  className="h-0.5 xs:h-1 bg-gradient-to-r from-transparent via-[#3c6e71] to-transparent mx-auto mt-1 xs:mt-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: isMobileOrTablet ? "80%" : "60%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
            
            <motion.p 
              className={`text-gray-600 dark:text-gray-300 mt-2 xs:mt-3 mb-4 xs:mb-5 font-medium leading-relaxed px-2 xs:px-3 relative ${
                getResponsiveSize('text-xs xs:text-sm max-w-xs', 'text-sm sm:text-base max-w-sm sm:max-w-md', 'text-base sm:text-lg md:text-xl max-w-md lg:max-w-lg')
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Journey through my professional milestones and career achievements
              </motion.span>
            </motion.p>
          </div>
        </AnimationWrapper>

        <AnimationWrapper>
          <div className="flex w-full justify-center px-2 sm:px-3 md:px-4">
            <motion.div 
              className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl" 
              variants={setVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: isMobileOrTablet ? 0.1 : 0.2 }}
            >
              <Timeline position={timelinePosition} sx={{ 
                padding: 0,
                '& .MuiTimelineContent-root': {
                  padding: getResponsiveSize('6px 8px', '8px 12px', '12px 16px')
                }
              }}>
                {experienceData && experienceData.length ? (
                  experienceData.map((experienceItem, index) => {
                    const timelineVariant = getTimelineItemVariant(isMobileOrTablet);
                    const cardHoverVariant = getCardHover(isMobileOrTablet);
                    return (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <motion.div
                            className="group relative"
                            whileHover={{ scale: getResponsiveSize(1.05, 1.1, 1.2) }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Ripple: always present, scaled opacity */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-[#3c6e71]"
                              style={{ opacity: isMobileOrTablet ? 0.6 : 1 }}
                              variants={rippleEffect}
                              initial="initial"
                              animate="animate"
                            />
                            
                            <motion.div
                              className="absolute inset-0 rounded-full border border-[#3c6e71]"
                              animate={{ 
                                scale: [1, getResponsiveSize(1.4, 1.6, 1.8), 1], 
                                opacity: [0.5, 0, 0.5],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                delay: index * 0.5,
                                ease: "easeInOut"
                              }}
                            />
                            
                            <motion.div
                              variants={pulseGlow}
                              animate="animate"
                            >
                              <TimelineDot 
                                className={`bg-[#3c6e71] shadow-lg border-2 border-white dark:border-gray-800 transition-all duration-300 relative z-10 ${
                                  getResponsiveSize('w-2 h-2 xs:w-2.5 xs:h-2.5', 'w-3 h-3 sm:w-3.5 sm:h-3.5', 'w-4 h-4 md:w-5 md:h-5')
                                }`} 
                              />
                            </motion.div>
                          </motion.div>
                          
                          {index !== experienceData.length - 1 && (
                            <motion.div
                              variants={connectorFlow}
                              initial="initial"
                              whileInView="animate"
                              viewport={{ once: true }}
                            >
                              <TimelineConnector className={`bg-gradient-to-b from-[#3c6e71] to-[#3c6e71]/50 w-${getResponsiveSize(0.5, 0.75, 1)}`} />
                            </motion.div>
                          )}
                        </TimelineSeparator>
                        
                        <TimelineContent>
                          <motion.div
                            className={`relative text-left rounded-xl ${
                              getResponsiveSize('p-2 xs:p-3 mt-0', 'p-3 sm:p-4 mt-1', 'p-4 md:p-5 lg:p-6 mt-2')
                            }`}
                            variants={timelineVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: getResponsiveSize("-20px", "-30px", "0px") }}
                            transition={{ delay: index * 0.1 }}
                            whileHover="hover"
                          >
                            {/* Shimmer border: always, but fade on hover uniformly */}
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3c6e71] via-transparent to-[#3c6e71] opacity-0"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            
                            <motion.div
                              className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-[#3c6e71] to-transparent rounded-l-lg"
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.2 }}
                              style={{ width: getResponsiveSize('2px', '2.5px', '3px') }}
                            />
                            
                            <motion.div
                              className="absolute inset-0 rounded-xl backdrop-blur-sm border border-rgba(60, 110, 113, 0.1)"
                              style={{ background: experienceGradient }}
                              whileHover={{
                                background: getGradient(0.1, true) // Slightly stronger on hover
                              }}
                            />
                            
                            <div className="relative z-10">
                              <div className={`flex items-center gap-1 ${
                                getResponsiveSize('mb-1', 'mb-2', 'mb-3')
                              }`}>
                                <motion.div 
                                  className={`bg-[#3c6e71] rounded-full ${
                                    getResponsiveSize('w-1 h-3', 'w-1 h-4', 'w-1.5 h-5 sm:h-6')
                                  }`}
                                  whileHover={{ 
                                    scale: 1.2,
                                    rotate: 180,
                                    transition: { duration: 0.3 }
                                  }}
                                />
                                <motion.p 
                                  className={`font-bold text-[#3c6e71] bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm border border-[#3c6e71]/20 ${
                                    getResponsiveSize('text-2xs px-1.5 py-0.5', 'text-xs px-2 py-1', 'text-xs xs:text-sm px-2 xs:px-3 py-1')
                                  }`}
                                  whileHover={{ 
                                    scale: 1.05,
                                    y: -1
                                  }}
                                  animate={{
                                    y: [0, -1, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.3
                                  }}
                                >
                                  {experienceItem.duration}
                                </motion.p>
                              </div>
                              
                              <motion.h3 
                                className={`font-bold text-[#000000] dark:text-gray-100 leading-tight ${
                                  getResponsiveSize('text-sm mb-0.5', 'text-base xs:text-lg mb-1', 'text-lg sm:text-xl md:text-2xl mb-1 xs:mb-2')
                                }`}
                                whileHover={{ 
                                  color: "#3c6e71",
                                  x: isMobileOrTablet ? 2 : 5
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {experienceItem.company}
                              </motion.h3>
                              
                              <div className={`flex flex-col ${
                                getResponsiveSize('gap-0.5 mb-1', 'gap-1 mb-2', 'xs:flex-row xs:items-center gap-1 mb-2 xs:mb-3')
                              }`}>
                                <motion.span 
                                  className={`font-semibold text-[#3c6e71] ${
                                    getResponsiveSize('text-xs', 'text-sm', 'text-sm xs:text-base sm:text-lg')
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                >
                                  {experienceItem.position}
                                </motion.span>
                                {!isSmallMobile && (
                                  <span className="hidden xs:inline text-gray-400 text-sm">•</span>
                                )}
                                <motion.span 
                                  className={`font-medium text-gray-600 dark:text-gray-300 ${
                                    getResponsiveSize('text-2xs', 'text-xs', 'text-xs xs:text-sm')
                                  }`}
                                  whileHover={{ color: "#3c6e71" }}
                                >
                                  {experienceItem.location}
                                </motion.span>
                              </div>
                              
                              <motion.p 
                                className={`font-normal text-gray-600 dark:text-gray-300 leading-relaxed ${
                                  getResponsiveSize('text-2xs mb-1', 'text-xs xs:text-sm mb-2', 'text-xs xs:text-sm md:text-base mb-2 xs:mb-3')
                                }`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.3 }}
                                whileHover={{ 
                                  color: "#000000",
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {experienceItem.jobprofile}
                              </motion.p>
                              
                              {/* Unified animated dots: same logic, responsive sizes */}
                              <div className="flex gap-0.5 xs:gap-1">
                                {[0, 1, 2].map((dotIndex) => (
                                  <motion.div
                                    key={dotIndex}
                                    className={`bg-[#3c6e71] rounded-full ${
                                      dotIndex === 0 ? 
                                        getResponsiveSize('w-2 h-0.5', 'w-3 xs:w-4 h-0.5', 'w-4 xs:w-5 sm:w-6 h-0.5 xs:h-1') :
                                      dotIndex === 1 ? 
                                        getResponsiveSize('w-1.5 h-0.5', 'w-2 xs:w-3 h-0.5', 'w-3 xs:w-4 sm:w-5 h-0.5 xs:h-1') :
                                        getResponsiveSize('w-1 h-0.5', 'w-1.5 xs:w-2 h-0.5', 'w-2 xs:w-3 sm:w-4 h-0.5 xs:h-1')
                                    }`}
                                    animate={{ 
                                      scale: [1, 1.3, 1],
                                      opacity: [0.5, 1, 0.5],
                                      x: [0, dotIndex % 2 === 0 ? 1 : -1, 0]
                                    }}
                                    transition={{ 
                                      duration: 1.5, 
                                      repeat: Infinity, 
                                      delay: dotIndex * 0.3 
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })
                ) : (
                  <motion.div 
                    className="text-center py-6 sm:py-8 md:py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className={`text-gray-600 dark:text-gray-300 ${
                      getResponsiveSize('text-sm', 'text-base', 'text-base sm:text-lg')
                    }`}>
                      No experience data available.
                    </p>
                  </motion.div>
                )}
              </Timeline>
            </motion.div>
          </div>
        </AnimationWrapper>
      </motion.div>

      {/* Education Section - Mirror structure for uniformity */}
      <motion.div
        className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobileOrTablet ? 0.1 : 0.2 }}
      >
        <AnimationWrapper className="py-3 xs:py-4 sm:py-5 md:py-6 lg:py-8">
          <div className="flex flex-col justify-center items-center text-center mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            <motion.div 
              className="relative mb-2 xs:mb-3 sm:mb-4 md:mb-5"
              whileHover="glitch"
              variants={textGlitch}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 z-20"
                style={{ opacity: isMobileOrTablet ? 0.7 : 1 }}
                variants={shimmerAnimation}
                initial="initial"
                animate="animate"
              />
              
              <motion.div
                className={`absolute ${getResponsiveSize('-inset-1', '-inset-2', '-inset-3')} bg-[#3c6e71]/20 rounded-2xl blur-sm`}
                variants={pulseGlow}
                animate="animate"
              />
              
              <div className="relative">
                <motion.h1 
                  className={`font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-['Inter',_sans-serif] px-2 xs:px-3 overflow-hidden ${
                    getResponsiveSize('text-lg xs:text-xl', 'text-2xl sm:text-3xl', 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl')
                  }`}
                  variants={staggerChildren}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {splitText("Academic Journey")}
                </motion.h1>
                
                <motion.div
                  className="h-0.5 xs:h-1 bg-gradient-to-r from-transparent via-[#3c6e71] to-transparent mx-auto mt-1 xs:mt-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: isMobileOrTablet ? "80%" : "60%" }}
                  transition={{ duration: 1, delay: 1 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
            
            <motion.p 
              className={`text-gray-600 dark:text-gray-300 mt-2 xs:mt-3 mb-4 xs:mb-5 font-medium leading-relaxed px-2 xs:px-3 relative ${
                getResponsiveSize('text-xs xs:text-sm max-w-xs', 'text-sm sm:text-base max-w-sm sm:max-w-md', 'text-base sm:text-lg md:text-xl max-w-md lg:max-w-lg')
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Educational foundations that shaped my expertise and knowledge
              </motion.span>
            </motion.p>
          </div>
        </AnimationWrapper>

        <AnimationWrapper>
          <div className="flex w-full justify-center px-2 sm:px-3 md:px-4">
            <motion.div 
              className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl" 
              variants={setVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: isMobileOrTablet ? 0.1 : 0.2 }}
            >
              <Timeline position={timelinePosition} sx={{ 
                padding: 0,
                '& .MuiTimelineContent-root': {
                  padding: getResponsiveSize('6px 8px', '8px 12px', '12px 16px')
                }
              }}>
                {educationData && educationData.length ? (
                  educationData.map((educationItem, index) => {
                    const timelineVariant = getTimelineItemVariant(isMobileOrTablet);
                    const cardHoverVariant = getCardHover(isMobileOrTablet);
                    return (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <motion.div
                            className="group relative"
                            whileHover={{ scale: getResponsiveSize(1.05, 1.1, 1.2) }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full bg-[#3c6e71]"
                              style={{ opacity: isMobileOrTablet ? 0.6 : 1 }}
                              variants={rippleEffect}
                              initial="initial"
                              animate="animate"
                            />
                            
                            <motion.div
                              className="absolute inset-0 rounded-full border border-[#3c6e71]"
                              animate={{ 
                                scale: [1, getResponsiveSize(1.4, 1.6, 1.8), 1], 
                                opacity: [0.5, 0, 0.5],
                                rotate: [0, -180, -360]
                              }}
                              transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                delay: index * 0.5 + 0.3,
                                ease: "easeInOut"
                              }}
                            />
                            
                            <motion.div
                              variants={pulseGlow}
                              animate="animate"
                            >
                              <TimelineDot 
                                className={`bg-[#3c6e71] shadow-lg border-2 border-white dark:border-gray-800 transition-all duration-300 relative z-10 ${
                                  getResponsiveSize('w-2 h-2 xs:w-2.5 xs:h-2.5', 'w-3 h-3 sm:w-3.5 sm:h-3.5', 'w-4 h-4 md:w-5 md:h-5')
                                }`} 
                              />
                            </motion.div>
                          </motion.div>
                          
                          {index !== educationData.length - 1 && (
                            <motion.div
                              variants={connectorFlow}
                              initial="initial"
                              whileInView="animate"
                              viewport={{ once: true }}
                            >
                              <TimelineConnector className={`bg-gradient-to-b from-[#3c6e71] to-[#3c6e71]/50 w-${getResponsiveSize(0.5, 0.75, 1)}`} />
                            </motion.div>
                          )}
                        </TimelineSeparator>
                        
                        <TimelineContent>
                          <motion.div
                            className={`relative text-left rounded-xl ${
                              getResponsiveSize('p-2 xs:p-3 mt-0', 'p-3 sm:p-4 mt-1', 'p-4 md:p-5 lg:p-6 mt-2')
                            }`}
                            variants={cardHoverVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: getResponsiveSize("-20px", "-30px", "0px") }}
                            transition={{ delay: index * 0.1 }}
                            whileHover="hover"
                          >
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3c6e71] via-transparent to-[#3c6e71] opacity-0"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            
                            <motion.div
                              className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-[#3c6e71] to-transparent rounded-l-lg"
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                              style={{ width: getResponsiveSize('2px', '2.5px', '3px') }}
                            />
                            
                            <motion.div
                              className="absolute inset-0 rounded-xl backdrop-blur-sm border border-rgba(60, 110, 113, 0.1)"
                              style={{ background: educationGradient }}
                              whileHover={{
                                background: getGradient(0.12, true)
                              }}
                            />
                            
                            <div className="relative z-10">
                              <div className={`flex items-center gap-1 ${
                                getResponsiveSize('mb-1', 'mb-2', 'mb-3')
                              }`}>
                                <motion.div 
                                  className={`bg-[#3c6e71] rounded-full ${
                                    getResponsiveSize('w-1 h-3', 'w-1 h-4', 'w-1.5 h-5 sm:h-6')
                                  }`}
                                  whileHover={{ 
                                    scale: 1.2,
                                    rotate: -180,
                                    transition: { duration: 0.3 }
                                  }}
                                />
                                <motion.p 
                                  className={`font-bold text-[#3c6e71] bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm border border-[#3c6e71]/20 ${
                                    getResponsiveSize('text-2xs px-1.5 py-0.5', 'text-xs px-2 py-1', 'text-xs xs:text-sm px-2 xs:px-3 py-1')
                                  }`}
                                  whileHover={{ 
                                    scale: 1.05,
                                    y: -1
                                  }}
                                  animate={{
                                    y: [0, -1, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.3 + 0.3
                                  }}
                                >
                                  {educationItem.year}
                                </motion.p>
                              </div>
                              
                              <motion.h3 
                                className={`font-bold text-[#000000] dark:text-gray-100 leading-tight ${
                                  getResponsiveSize('text-sm mb-0.5', 'text-base xs:text-lg mb-1', 'text-lg sm:text-xl md:text-2xl mb-1 xs:mb-2')
                                }`}
                                whileHover={{ 
                                  color: "#3c6e71",
                                  x: isMobileOrTablet ? 2 : 5
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {educationItem.college}
                              </motion.h3>
                              
                              <motion.p 
                                className={`font-semibold text-[#3c6e71] leading-relaxed ${
                                  getResponsiveSize('text-xs mb-1', 'text-sm mb-2', 'text-sm xs:text-base sm:text-lg mb-2 xs:mb-3')
                                }`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.3 + 0.2 }}
                                whileHover={{ scale: 1.02 }}
                              >
                                {educationItem.degree}
                              </motion.p>
                              
                              <div className="flex gap-0.5 xs:gap-1">
                                {[0, 1, 2].map((dotIndex) => (
                                  <motion.div
                                    key={dotIndex}
                                    className={`bg-[#3c6e71] rounded-full ${
                                      dotIndex === 0 ? 
                                        getResponsiveSize('w-2 h-0.5', 'w-3 xs:w-4 h-0.5', 'w-4 xs:w-5 sm:w-6 h-0.5 xs:h-1') :
                                      dotIndex === 1 ? 
                                        getResponsiveSize('w-1.5 h-0.5', 'w-2 xs:w-3 h-0.5', 'w-3 xs:w-4 sm:w-5 h-0.5 xs:h-1') :
                                        getResponsiveSize('w-1 h-0.5', 'w-1.5 xs:w-2 h-0.5', 'w-2 xs:w-3 sm:w-4 h-0.5 xs:h-1')
                                    }`}
                                    animate={{ 
                                      scale: [1, 1.3, 1],
                                      opacity: [0.5, 1, 0.5],
                                      x: [0, dotIndex % 2 === 0 ? -1 : 1, 0]
                                    }}
                                    transition={{ 
                                      duration: 1.5, 
                                      repeat: Infinity, 
                                      delay: dotIndex * 0.3 + 0.3
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })
                ) : (
                  <motion.div 
                    className="text-center py-6 sm:py-8 md:py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className={`text-gray-600 dark:text-gray-300 ${
                      getResponsiveSize('text-sm', 'text-base', 'text-base sm:text-lg')
                    }`}>
                      No education data available.
                    </p>
                  </motion.div>
                )}
              </Timeline>
            </motion.div>
          </div>
        </AnimationWrapper>
      </motion.div>
    </div>
  );
}