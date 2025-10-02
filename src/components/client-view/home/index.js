"use client";

import { useMemo, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaDownload,
  FaEye,
} from "react-icons/fa";
import Image from "next/image";
import aiImage from "../../../assets/ai-image.png";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 1.5 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration,
      },
    }),
  };
}

const socialIcons = [
  {
    id: "facebook",
    icon: (
      <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110" />
    ),
    href: "#",
  },
  {
    id: "twitter",
    icon: (
      <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
    ),
    href: "#",
  },
  {
    id: "linkedin",
    icon: (
      <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 group-hover:text-blue-700 group-hover:scale-110" />
    ),
    href: "#",
  },
  {
    id: "instagram",
    icon: (
      <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 group-hover:text-pink-600 group-hover:scale-110" />
    ),
    href: "#",
  },
];

// Animation variants
const hologramEffect = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0.3, 0.7, 0.3],
    scale: [0.8, 1, 0.8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const morphingBackground = {
  animate: {
    background: [
      'linear-gradient(45deg, #3c6e71 0%, #2f5a5d 25%, #284a4d 50%, #2f5a5d 75%, #3c6e71 100%)',
      'linear-gradient(135deg, #3c6e71 0%, #284a4d 25%, #2f5a5d 50%, #284a4d 75%, #3c6e71 100%)',
      'linear-gradient(225deg, #3c6e71 0%, #2f5a5d 25%, #284a4d 50%, #2f5a5d 75%, #3c6e71 100%)',
      'linear-gradient(315deg, #3c6e71 0%, #284a4d 25%, #2f5a5d 50%, #284a4d 75%, #3c6e71 100%)',
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const quantumOrbit = {
  animate: (i) => ({
    rotate: 360,
    scale: [1, 1.2, 1],
    transition: {
      rotate: {
        duration: 20 + i * 5,
        repeat: Infinity,
        ease: "linear"
      },
      scale: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  })
};

const neuralNetwork = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const glitchText = {
  normal: { x: 0, y: 0 },
  glitch: {
    x: [0, -2, 2, -2, 0],
    y: [0, 1, -1, 1, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const particleExplosion = {
  initial: { scale: 0, opacity: 0 },
  animate: (i) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    x: Math.cos(i * 45 * (Math.PI / 180)) * 50,
    y: Math.sin(i * 45 * (Math.PI / 180)) * 50,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      delay: i * 0.1,
      ease: "easeOut"
    }
  })
};

const floatingIslands = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const matrixRain = {
  initial: { y: -100 },
  animate: {
    y: ["0%", "100%"],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const cyberPulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    boxShadow: [
      "0 0 0 0 rgba(60, 110, 113, 0.4)",
      "0 0 0 20px rgba(60, 110, 113, 0)",
      "0 0 0 0 rgba(60, 110, 113, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeOut"
    }
  }
};

export default function ClientHomeView({ data }) {
  console.log(data, "ClientHomeView data");

  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  // Enhanced particle animation
  const particleAnimation = {
    animate: (i) => ({
      y: [0, -40, 0],
      x: [0, Math.sin(i) * 20, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
      transition: {
        duration: 5 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5
      }
    })
  };

  // Text reveal with character animation
  const textReveal = {
    hidden: { opacity: 0, y: 50, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  // Enhanced floating animation
  const floatingAnimation = {
    animate: {
      y: [0, -25, 0],
      x: [0, 10, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Split text into characters for advanced animation
  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        className="inline-block"
        variants={textReveal}
        whileHover={{
          scale: 1.3,
          y: -5,
          color: "#3c6e71",
          textShadow: "0 0 10px rgba(60, 110, 113, 0.5)",
          transition: { duration: 0.2 }
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <div
      className="relative w-full mt-20 sm:mt-24 lg:mt-28 px-4 sm:px-6 lg:px-8 mx-auto overflow-hidden min-h-screen flex items-center"
      id="home"
    >
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Matrix Rain Effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#3c6e71] text-xs opacity-20 font-mono"
            style={{ left: `${i * 5}%` }}
            variants={matrixRain}
            initial="initial"
            animate="animate"
            custom={i}
          >
            {Math.random().toString(36).substring(2, 3)}
          </motion.div>
        ))}

        {/* Quantum Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-[#3c6e71] ${
              i % 5 === 0 ? 'w-4 h-4 opacity-30' :
              i % 5 === 1 ? 'w-3 h-3 opacity-40' :
              i % 5 === 2 ? 'w-2 h-2 opacity-50' :
              i % 5 === 3 ? 'w-5 h-5 opacity-20' :
              'w-1 h-1 opacity-60'
            }`}
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${20 + (i * 5)}%`,
            }}
            custom={i}
            variants={particleAnimation}
            animate="animate"
          />
        ))}

        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M0,50 Q100,30 200,70 T400,50 T600,30 T800,70 T1000,50"
            stroke="#3c6e71"
            strokeWidth="1"
            fill="none"
            variants={neuralNetwork}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M0,150 Q150,100 300,180 T600,120 T900,180"
            stroke="#3c6e71"
            strokeWidth="1"
            fill="none"
            variants={neuralNetwork}
            initial="initial"
            animate="animate"
          />
        </svg>

        {/* Floating Islands */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-[#3c6e71]/10 rounded-full blur-xl"
          variants={floatingIslands}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-32 right-16 w-16 h-16 bg-[#3c6e71]/15 rounded-full blur-lg"
          variants={floatingIslands}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      <AnimationWrapper>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8 sm:py-12 lg:py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#3c6e71]/20 dark:border-[#3c6e71]/40 relative overflow-hidden"
          variants={setVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Cyber Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-[#3c6e71]/30"
            variants={cyberPulse}
            initial="initial"
            animate="animate"
          />

          {/* Morphing Background */}
          <motion.div
            className="absolute inset-0 opacity-5 rounded-3xl"
            variants={morphingBackground}
            initial="initial"
            animate="animate"
          />

          {/* Hologram Effect Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3c6e71]/5 to-transparent opacity-0 hover:opacity-100 rounded-3xl"
            variants={hologramEffect}
            initial="initial"
            whileHover="animate"
          />

          {/* Text Section */}
          <div className="flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8 order-2 lg:order-1 relative z-10">
            <motion.div
              className="w-full"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
            >
              <motion.div
                variants={glitchText}
                whileHover="glitch"
                className="mb-6"
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100"
                >
                  {data && data.length ? (
                    splitText(data[0]?.heading)
                  ) : (
                    <>
                      {splitText("Transforming Ideas Into Reality")}
                    </>
                  )}
                </motion.h1>

                {/* Animated Cursor */}
                <motion.div
                  className="inline-block w-2 h-12 bg-[#3c6e71] ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>

              <motion.p 
                className="text-gray-700 dark:text-gray-300 mt-4 mb-8 text-base sm:text-lg lg:text-xl font-medium max-w-md lg:max-w-lg leading-relaxed"
                variants={textReveal}
                whileHover={{
                  scale: 1.02,
                  x: 10,
                  transition: { duration: 0.3 }
                }}
              >
                {data && data.length
                  ? data[0]?.summary
                  : "Crafting digital experiences that blend innovation with functionality. Let's build something extraordinary together."}
              </motion.p>

              {/* Social Icons with Particle Explosion */}
              <motion.div 
                className="flex gap-3 sm:gap-4 mb-8 relative"
                variants={textReveal}
              >
                {socialIcons.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative"
                    whileHover="hover"
                    initial="initial"
                    animate="animate"
                  >
                    {/* Particle Explosion on Hover */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-current rounded-full"
                        variants={particleExplosion}
                        custom={i}
                      />
                    ))}
                    
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-2xl bg-gradient-to-br from-[#3c6e71] to-[#2f5a5d] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden z-10"
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        delay: 0.8 + index * 0.1,
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        y: -8,
                        rotate: 360,
                        transition: { duration: 0.4 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Animated Background */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                      
                      {item.icon}
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons with Advanced Animations */}
              <motion.div 
                className="flex gap-4 flex-wrap"
                variants={textReveal}
              >
                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#3c6e71] to-[#2f5a5d] text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden relative"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#2f5a5d] to-[#3c6e71] opacity-0 group-hover:opacity-100"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <FaDownload className="w-4 h-4" />
                    Download CV
                  </span>
                </motion.button>

                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#3c6e71] text-[#3c6e71] dark:text-gray-300 font-semibold rounded-2xl hover:bg-[#3c6e71] hover:text-white transition-all duration-300 group overflow-hidden relative"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Magnetic Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#3c6e71] rounded-2xl"
                    whileHover={{
                      scale: 1.1,
                      opacity: 0,
                      transition: { duration: 0.4 }
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <FaEye className="w-4 h-4" />
                    View Portfolio
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Section with Advanced Effects */}
          <motion.div 
            className="flex justify-center items-center order-1 lg:order-2 relative z-10"
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
          >
            <motion.div
              ref={containerRef}
              className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] group"
              variants={floatingAnimation}
              animate="animate"
            >
              {/* Quantum Orbital Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute border border-[#3c6e71]/20 rounded-3xl"
                  style={{
                    inset: `${i * 20}px`
                  }}
                  custom={i}
                  variants={quantumOrbit}
                  animate="animate"
                />
              ))}
              
              {/* Holographic Grid */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3c6e71]/10 via-transparent to-[#3c6e71]/10"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  background: [
                    'linear-gradient(45deg, rgba(60,110,113,0.1) 0%, transparent 50%, rgba(60,110,113,0.1) 100%)',
                    'linear-gradient(135deg, rgba(60,110,113,0.2) 0%, transparent 50%, rgba(60,110,113,0.2) 100%)',
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/60 dark:border-gray-800/60 shadow-2xl backdrop-blur-sm group"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 35px 60px -15px rgba(60, 110, 113, 0.5)",
                  borderColor: "rgba(60, 110, 113, 0.5)"
                }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <Image
                  src={aiImage}
                  alt="Professional Profile"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 420px"
                />
                
                {/* Dynamic Holographic Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Scanning Line Effect */}
                <motion.div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#3c6e71] to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    y: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Animated Quantum Dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  className={`absolute bg-[#3c6e71] rounded-full ${
                    i % 3 === 0 ? 'w-3 h-3' : 
                    i % 3 === 1 ? 'w-2 h-2' : 
                    'w-4 h-4'
                  }`}
                  style={{
                    top: i % 2 === 0 ? '-10px' : 'auto',
                    bottom: i % 2 !== 0 ? '-10px' : 'auto',
                    left: i % 3 === 0 ? '-10px' : 'auto',
                    right: i % 3 === 1 ? '-10px' : 'auto',
                  }}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 1, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}

              {/* Energy Pulse */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-[#3c6e71] opacity-0 group-hover:opacity-100"
                whileHover={{
                  scale: 1.1,
                  opacity: [0.3, 0.6, 0.3],
                  transition: {
                    duration: 2,
                    repeat: Infinity
                  }
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}