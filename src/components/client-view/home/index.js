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
      <FaFacebookF
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110"
      />
    ),
    href: "#",
  },
  {
    id: "twitter",
    icon: (
      <FaTwitter
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110"
      />
    ),
    href: "#",
  },
  {
    id: "linkedin",
    icon: (
      <FaLinkedinIn
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-blue-700 group-hover:scale-110"
      />
    ),
    href: "#",
  },
  {
    id: "instagram",
    icon: (
      <FaInstagram
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-pink-600 group-hover:scale-110"
      />
    ),
    href: "#",
  },
];

export default function ClientHomeView({ data }) {
  console.log(data, "ClientHomeView data");

  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  return (
    <div
      className="relative max-w-screen-xl mt-16 px-4 sm:px-8 lg:px-12 mx-auto overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/10 via-white/70 to-[#3c6e71]/10 dark:from-[#3c6e71]/30 dark:via-gray-900/70 dark:to-[#3c6e71]/30 rounded-2xl -z-10" />
      
      <AnimationWrapper>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 lg:py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#3c6e71]/20 dark:border-[#3c6e71]/40"
          variants={setVariants}
        >
          {/* Text Section */}
          <div className="flex flex-col justify-center items-start px-6 lg:px-8 order-2 lg:order-1">
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100">
              {data && data.length ? (
                data[0]?.heading.split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index === 2 || index === 3
                        ? "text-[#3c6e71]"
                        : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {item}{" "}
                  </motion.span>
                ))
              ) : (
                <span className="text-[#3c6e71]">Welcome to Our Platform</span>
              )}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-4 mb-8 text-lg font-semibold max-w-md leading-relaxed">
              {data && data.length
                ? data[0]?.summary
                : "Explore our innovative solutions designed to empower your business success."}
            </p>
            <motion.div className="flex gap-4 mb-6">
              {socialIcons.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex justify-center items-center rounded-full bg-[#3c6e71] shadow-md hover:shadow-lg transition-all duration-300"
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 0.3 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
            <div className="w-24 h-1 bg-[#3c6e71] rounded" />
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <motion.div
              ref={containerRef}
              className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="absolute inset-0 bg-[#3c6e71]/20 rounded-2xl shadow-lg transform rotate-2 group-hover:rotate-0 transition-all duration-500" />
              <Image
                src={aiImage}
                alt="Professional Profile"
                fill
                className="rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg transition-all duration-500 group-hover:shadow-xl"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-[#3c6e71] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md">
                Innovator
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}
