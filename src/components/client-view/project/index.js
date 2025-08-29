"use client";

import { useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";

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

const projectItemVariant = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function ClientProjectView({ data }) {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const router = useRouter();
  const setVariants = variants();

  return (
    <div
      className="relative max-w-screen-xl mx-auto mt-12 mb-8 px-4 sm:px-8 xl:px-12"
      id="project"
    >
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/3 via-white to-purple-600/3 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />

      <AnimationWrapper className="py-6 sm:py-10">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight font-['Inter',_sans-serif]">
            {"My Projects".split(" ").map((item, index) => (
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
          <svg
            id="progress"
            width={80}
            height={80}
            viewBox="0 0 100 100"
            className="mt-4"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-gray-300 stroke-2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-[url(#progressGradient)] stroke-2"
              style={{ pathLength: scrollXProgress }}
            >
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#14b8a6" }} />
                  <stop offset="100%" style={{ stopColor: "#7c3aed" }} />
                </linearGradient>
              </defs>
            </motion.circle>
          </svg>
        </div>
      </AnimationWrapper>
      <AnimationWrapper>
        <motion.ul
          className="project-wrapper grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          ref={containerRef}
          variants={setVariants}
          initial="offscreen"
          animate="onscreen"
        >
          {data && data.length ? (
            data.map((item, index) => (
              <motion.li
                key={index}
                className="w-full flex items-stretch"
                variants={projectItemVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-gradient-to-r hover:from-teal-500 hover:to-purple-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="flex flex-col p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white capitalize">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">
                      {item.createdAt.split("T")[0]}
                    </p>
                    <div className="grid gap-3 mt-4 grid-cols-2">
                      {item?.technologies.split(",").map((techItem, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-block py-2 px-4 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 rounded-md text-xs font-medium tracking-wide text-center hover:bg-teal-100 dark:hover:bg-teal-800/50 transition-colors duration-200"
                        >
                          {techItem.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto p-6 pt-0 flex justify-center gap-3">
                    <button
                      onClick={() => router.push(item.website)}
                      className="py-2 px-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-md text-sm tracking-wide hover:from-teal-600 hover:to-purple-700 transition-colors duration-200"
                    >
                      Website
                    </button>
                    <button
                      onClick={() => router.push(item.github)}
                      className="py-2 px-4 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-md text-sm tracking-wide hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      Github
                    </button>
                  </div>
                </div>
              </motion.li>
            ))
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center col-span-full">
              No projects available
            </p>
          )}
        </motion.ul>
      </AnimationWrapper>
    </div>
  );
}