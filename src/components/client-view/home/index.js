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
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110"
      />
    ),
    href: "#",
  },
  {
    id: "twitter",
    icon: (
      <FaTwitter
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-sky-400 group-hover:scale-110"
      />
    ),
    href: "#",
  },
  {
    id: "linkedin",
    icon: (
      <FaLinkedinIn
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110"
      />
    ),
    href: "#",
  },
  {
    id: "instagram",
    icon: (
      <FaInstagram
        className="w-6 h-6 text-white transition-all duration-300 group-hover:text-pink-400 group-hover:scale-110"
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
      className="relative max-w-screen-xl mt-24 px-4 sm:px-8 xl:px-16 mx-auto overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-white/60 to-purple-600/10 dark:from-teal-900/30 dark:via-gray-900/60 dark:to-purple-900/30 rounded-3xl -z-10" />
      
      <AnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-8 sm:py-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-teal-200/30 dark:border-purple-700/30"
          variants={setVariants}
        >
          {/* Text Section */}
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1 px-4 sm:px-6">
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
              {data && data.length ? (
                data[0]?.heading.split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index === 2 || index === 3
                        ? "bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
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
                <span className="bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome to Our Platform
                </span>
              )}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-4 mb-8 text-lg font-medium max-w-lg leading-relaxed">
              {data && data.length
                ? data[0]?.summary
                : "Discover the future of innovation with our cutting-edge solutions."}
            </p>
            <motion.div className="flex gap-4 mb-4">
              {socialIcons.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex justify-center items-center rounded-xl bg-gradient-to-br from-teal-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-400 overflow-hidden"
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 0.3 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full" />
          </div>

          {/* Image Section */}
          <motion.div
            ref={containerRef}
            className="flex w-full justify-end items-center"
          >
            <motion.div
              drag
              dragConstraints={containerRef}
              className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] group cursor-grab active:cursor-grabbing"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-purple-600/30 rounded-3xl shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-700 opacity-80" />
              <Image
                src={aiImage}
                alt="Profile Picture"
                fill
                className="rounded-3xl absolute top-[-10px] left-[-10px] border-4 border-white/60 dark:border-gray-700/60 shadow-2xl object-cover transition-all duration-700 group-hover:shadow-3xl"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                Innovator
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}