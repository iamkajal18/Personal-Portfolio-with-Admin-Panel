"use client";

import { useMemo, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
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

export default function ClientHomeView({ data }) {
  console.log(data, "ClientHomeView data");

  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  // Particle animation for background
  const particleAnimation = {
    animate: {
      y: [0, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Floating animation for image
  const floatingAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      className="relative w-full mt-20 sm:mt-24 lg:mt-28 px-4 sm:px-6 lg:px-8 mx-auto overflow-hidden"
      id="home"
    >
      {/* Animated Background Particles */}
      <motion.div 
        className="absolute top-1/4 left-10 w-3 h-3 bg-[#3c6e71]/20 rounded-full"
        {...particleAnimation}
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-2 h-2 bg-[#3c6e71]/30 rounded-full"
        animate={{
          ...particleAnimation.animate,
          transition: { ...particleAnimation.animate.transition, delay: 1 }
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-20 w-4 h-4 bg-[#3c6e71]/15 rounded-full"
        animate={{
          ...particleAnimation.animate,
          transition: { ...particleAnimation.animate.transition, delay: 2 }
        }}
      />
      
      <AnimationWrapper>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8 sm:py-12 lg:py-16 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#3c6e71]/10 dark:border-[#3c6e71]/30 relative overflow-hidden"
          variants={setVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Animated Background Gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/5 via-transparent to-[#3c6e71]/5"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(60,110,113,0.05) 0%, transparent 50%, rgba(60,110,113,0.05) 100%)',
                'linear-gradient(135deg, rgba(60,110,113,0.08) 0%, transparent 50%, rgba(60,110,113,0.08) 100%)',
                'linear-gradient(45deg, rgba(60,110,113,0.05) 0%, transparent 50%, rgba(60,110,113,0.05) 100%)',
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.h1 
                className="mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100"
                variants={textReveal}
              >
                {data && data.length ? (
                  data[0]?.heading.split(" ").map((item, index) => (
                    <motion.span
                      key={index}
                      className={`inline-block ${
                        index >= data[0]?.heading.split(" ").length - 2 
                          ? "text-[#3c6e71] bg-gradient-to-r from-[#3c6e71] to-[#2f5a5d] bg-clip-text text-transparent"
                          : ""
                      }`}
                      variants={textReveal}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {item}{" "}
                    </motion.span>
                  ))
                ) : (
                  <>
                    <motion.span variants={textReveal}>
                      Transforming{" "}
                    </motion.span>
                    <motion.span 
                      className="bg-gradient-to-r from-[#3c6e71] to-[#2f5a5d] bg-clip-text text-transparent"
                      variants={textReveal}
                    >
                      Ideas{" "}
                    </motion.span>
                    <motion.span variants={textReveal}>
                      Into{" "}
                    </motion.span>
                    <motion.span 
                      className="bg-gradient-to-r from-[#3c6e71] to-[#2f5a5d] bg-clip-text text-transparent"
                      variants={textReveal}
                    >
                      Reality
                    </motion.span>
                  </>
                )}
              </motion.h1>

              <motion.p 
                className="text-gray-700 dark:text-gray-300 mt-4 mb-8 text-base sm:text-lg lg:text-xl font-medium max-w-md lg:max-w-lg leading-relaxed"
                variants={textReveal}
              >
                {data && data.length
                  ? data[0]?.summary
                  : "Crafting digital experiences that blend innovation with functionality. Let's build something extraordinary together."}
              </motion.p>

              <motion.div 
                className="flex gap-3 sm:gap-4 mb-8"
                variants={textReveal}
              >
                {socialIcons.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-2xl bg-gradient-to-br from-[#3c6e71] to-[#2f5a5d] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 100,
                      delay: 0.8 + index * 0.1,
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {item.icon}
                  </motion.a>
                ))}
              </motion.div>

              <motion.div 
                className="flex gap-4 flex-wrap"
                variants={textReveal}
              >
                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#3c6e71] to-[#2f5a5d] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#2f5a5d] to-[#3c6e71] opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#3c6e71] text-[#3c6e71] dark:text-gray-300 font-semibold rounded-2xl hover:bg-[#3c6e71] hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Portfolio
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div 
            className="flex justify-center items-center order-1 lg:order-2 relative z-10"
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
          >
            <motion.div
              ref={containerRef}
              className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] group"
              {...floatingAnimation}
            >
              {/* Animated Orbital Rings */}
              <motion.div 
                className="absolute inset-0 border-2 border-[#3c6e71]/20 rounded-3xl"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              <motion.div 
                className="absolute inset-4 border border-[#3c6e71]/10 rounded-2xl"
                animate={{
                  rotate: -360,
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/50 dark:border-gray-800/50 shadow-2xl backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(60, 110, 113, 0.4)",
                  borderColor: "rgba(60, 110, 113, 0.3)"
                }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={aiImage}
                  alt="Professional Profile"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 420px"
                />
                
                {/* Dynamic Gradient Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Animated Connection Dots */}
              <motion.div 
                className="absolute -top-2 -right-2 w-4 h-4 bg-[#3c6e71] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#3c6e71] rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}