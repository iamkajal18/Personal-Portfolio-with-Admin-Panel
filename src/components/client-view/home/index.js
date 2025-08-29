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
        className="w-6 h-6 text-white transition-colors duration-300 group-hover:text-blue-500"
      />
    ),
  },
  {
    id: "twitter",
    icon: (
      <FaTwitter
        className="w-6 h-6 text-white transition-colors duration-300 group-hover:text-sky-400"
      />
    ),
  },
  {
    id: "linkedin",
    icon: (
      <FaLinkedinIn
        className="w-6 h-6 text-white transition-colors duration-300 group-hover:text-blue-700"
      />
    ),
  },
  {
    id: "instagram",
    icon: (
      <FaInstagram
        className="w-6 h-6 text-white transition-colors duration-300 group-hover:text-pink-500"
      />
    ),
  },
];

export default function ClientHomeView({ data }) {
  console.log(data, "ClientHomeView");

  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  return (
    <div
      className="relative max-w-screen-xl mt-24 px-4 sm:px-8 xl:px-16 mx-auto overflow-hidden"
      id="home"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-white to-purple-600/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />
      
      <AnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-xl"
          variants={setVariants}
        >
          {/* Text Section */}
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1 px-4 sm:px-6">
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {data && data.length ? (
                data[0]?.heading.split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`${
                      index === 2 || index === 3
                        ? "bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-900 dark:text-white"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {item}{" "}
                  </motion.span>
                ))
              ) : (
                <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to Our Platform
                </span>
              )}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-4 mb-8 text-lg font-medium max-w-lg">
              {data && data.length
                ? data[0]?.summary
                : "Discover the future of innovation with our cutting-edge solutions."}
            </p>
            <motion.div className="flex gap-4">
              {socialIcons.map((item) => (
                <motion.div
                  key={item.id}
                  className="group w-10 h-10 flex justify-center items-center rounded-md bg-gradient-to-br from-teal-500 to-purple-600 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 0.2,
                  }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            ref={containerRef}
            className="flex w-full justify-end items-center"
          >
            <motion.div
              drag
              dragConstraints={containerRef}
              className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <Image
                src={aiImage}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-2xl absolute top-[-15px] left-[-15px] border-4 border-white dark:border-gray-700 shadow-xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}



