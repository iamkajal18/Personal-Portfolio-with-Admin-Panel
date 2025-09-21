"use client";

import { useRef, useEffect } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

function variants() {
  return {
    offscreen: { y: 20, opacity: 0 },
    onscreen: ({ duration = 0.5 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: { type: "ease", duration },
    }),
  };
}

const projectItemVariant = {
  hidden: { y: 40, opacity: 0, filter: "brightness(0.8)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "brightness(1)",
    transition: { duration: 0.7, ease: [0.34, 0.02, 0.32, 1] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const imageVariant = {
  hidden: { scale: 1.2, clipPath: "inset(10% 20% 10% 20%)" },
  visible: {
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const techTagVariant = {
  hidden: { x: -30, opacity: 0, rotate: -5 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 10 },
  },
};

const rippleVariant = {
  initial: { scale: 0, opacity: 0.6 },
  animate: {
    scale: 2,
    opacity: 0,
    transition: { duration: 1.5, repeat: Infinity, repeatType: "restart" },
  },
};

export default function ClientProjectView({ data }) {
  const containerRef = useRef(null);
  const router = useRouter();
  const setVariants = variants();
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    console.log("Client View - Project data received:", data ? data : "Data is undefined or null");
    if (data && !Array.isArray(data)) {
      console.warn("Client View - Data is not an array:", data);
    }
  }, [data]);

  return (
    <section className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8" id="project">
      {/* Unique Ripple Background Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/10 via-white/70 to-[#3c6e71]/10 dark:from-[#3c6e71]/30 dark:via-gray-900/70 dark:to-[#3c6e71]/30" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#3c6e71]/20 mix-blend-multiply"
            style={{
              top: `${20 + i * 30}%`,
              left: `${20 + i * 25}%`,
              width: "200px",
              height: "200px",
            }}
            variants={rippleVariant}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.5 }}
          />
        ))}
      </div>
      
      <AnimationWrapper className="mb-12">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3c6e71]/10 rounded-lg text-sm font-semibold text-[#3c6e71] mb-6 border border-[#3c6e71]/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Portfolio
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] dark:text-gray-100 mb-4 leading-tight">
            Selected Projects
          </h1>
          <motion.p
            className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A showcase of my technical expertise and creative solutions
          </motion.p>
          <motion.div
            className="mt-8 w-24 h-1 bg-[#3c6e71] rounded mx-auto shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      </AnimationWrapper>

      <AnimationWrapper>
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <motion.article
                key={item._id || index}
                variants={projectItemVariant}
                className="group relative overflow-hidden border-b-4 border-[#3c6e71]/20 hover:border-[#3c6e71]/50 transition-all duration-500"
                whileHover={{ y: -10, rotateX: 5, zIndex: 1 }}
              >
                <div className="relative overflow-hidden h-48">
                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.name || "Project"}
                      className="w-full h-full object-cover"
                      variants={imageVariant}
                      initial="hidden"
                      animate="visible"
                    />
                  ) : (
                    <motion.div 
                      className="w-full h-full bg-gradient-to-br from-[#3c6e71]/20 to-[#3c6e71]/10 flex items-center justify-center"
                      variants={imageVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      <svg className="w-12 h-12 text-[#3c6e71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                  )}
                  {/* Unique Ripple Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-[#3c6e71]/10 opacity-0 group-hover:opacity-50"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 0.5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute top-3 right-3 bg-[#3c6e71] text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, y: -10 }}
                    whileHover={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                  >
                    Live
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#000000] dark:text-gray-100 truncate capitalize group-hover:text-[#3c6e71] transition-colors duration-300">
                      {item.name || "Unnamed Project"}
                    </h3>
                    <time className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                        : "N/A"}
                    </time>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {item.description || "No description available"}
                    </p>
                  </div>
                  {item?.technologies && (
                    <motion.div 
                      className="mb-5 flex flex-wrap gap-2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {item.technologies
                        .split(",")
                        .slice(0, 4)
                        .map((techItem, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-[#3c6e71]/10 text-[#3c6e71] text-xs font-medium rounded-full border border-[#3c6e71]/20 group-hover:scale-105"
                            variants={techTagVariant}
                          >
                            {techItem.trim()}
                          </motion.span>
                        ))}
                      {item.technologies.split(",").length > 4 && (
                        <span className="px-3 py-1 bg-gray-100/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200/50 dark:border-gray-700/50">
                          +{item.technologies.split(",").length - 4}
                        </span>
                      )}
                    </motion.div>
                  )}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => router.push(item.website || "/")}
                      className="flex-1 py-2.5 px-4 bg-[#3c6e71] text-white text-xs font-semibold rounded-xl hover:bg-[#2f5a5d] transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View
                    </motion.button>
                    <motion.button
                      onClick={() => router.push(item.github || "/")}
                      className="py-2.5 px-4 border border-[#3c6e71]/50 text-[#000000] dark:text-gray-300 text-xs font-semibold rounded-xl hover:bg-[#3c6e71]/10 transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#3c6e71]/10 rounded-lg flex items-center justify-center border border-[#3c6e71]/20">
                <svg className="w-8 h-8 text-[#3c6e71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#000000] dark:text-gray-100 mb-2">No Projects Available</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Projects will be displayed here once added.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimationWrapper>
    </section>
  );
}