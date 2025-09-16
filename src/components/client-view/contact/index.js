// Component: ClientContactView
"use client";

import { useEffect, useState } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import { addData } from "@/services";
import Image from "next/image";

const controls = [
  {
    name: "name",
    placeholder: "Enter your name",
    type: "text",
    label: "Name",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "email",
    placeholder: "Enter your email address",
    type: "email",
    label: "Email",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
  },
  {
    name: "message",
    placeholder: "Tell me about your project or inquiry...",
    type: "text",
    label: "Message",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

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

export default function ClientContactView({ data }) {
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSendMessage() {
    setIsSubmitting(true);
    const res = await addData("contact", formData);
    console.log(res, "contact-res");

    if (res && res.success) {
      setFormData(initialFormData);
      setShowSuccessMessage(true);
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage]);

  const isValidForm = () => {
    return (
      formData &&
      formData.name !== "" &&
      formData.email !== "" &&
      formData.message !== ""
    );
  };

  return (
    <div
      className="relative max-w-screen-xl mt-16 mb-16 px-4 sm:px-8 xl:px-16 mx-auto"
      id="contact"
    >
      {/* Enhanced Background with Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white/70 to-purple-50/50 dark:from-teal-900/30 dark:via-gray-900/50 dark:to-purple-900/30" />
        <div className="absolute top-20 -right-4 w-72 h-72 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute -bottom-8 -left-4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000" />
      </div>

      <AnimationWrapper className="py-8 sm:py-12">
        <motion.div
          className="flex flex-col justify-center items-center text-center mb-12"
          variants={variants()}
          initial="offscreen"
          animate="onscreen"
        >
          <motion.div 
            className="relative mb-6 group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse" />
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-8 py-4 rounded-2xl border border-teal-200/50 dark:border-purple-700/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight font-['Inter',_sans-serif] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                {(data?.contactHeading || "Get In Touch").split(" ").map((item, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index === 1 || index === 2
                        ? "bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
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
            </div>
          </motion.div>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {data?.contactSubheading || "Let's discuss your project and how I can help bring your ideas to life"}
          </motion.p>
        </motion.div>
      </AnimationWrapper>

      <AnimationWrapper>
        <motion.div
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
          variants={variants()}
          initial="offscreen"
          animate="onscreen"
          custom={{ duration: 0.9 }}
        >
          {/* Left Side - Illustration */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <motion.div 
              className="relative w-full max-w-md group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-70 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-teal-50/80 to-purple-50/80 dark:from-teal-900/40 dark:to-purple-900/40 rounded-2xl p-8 border border-teal-200/50 dark:border-purple-700/40 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square w-full relative rounded-xl overflow-hidden">
                  <Image
                    src="/contact.jpg"
                    alt="Contact Illustration"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Let's Work Together</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    I'm always interested in new challenges and opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-3/5">
            <div className="w-full max-w-lg mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-teal-200/60 dark:border-purple-700/60 hover:shadow-3xl transition-all duration-500">
              <div className="flex flex-wrap -m-2">
                {controls.map((controlItem, index) => (
                  <motion.div
                    key={controlItem.name}
                    className="p-2 w-full"
                    variants={variants()}
                    initial="offscreen"
                    animate="onscreen"
                    custom={{ duration: 0.8 + index * 0.1 }}
                  >
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <span className="text-teal-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-teal-400 transition-colors">
                          {controlItem.icon}
                        </span>
                        {controlItem.label}
                      </label>
                      {controlItem.name === "message" ? (
                        <textarea
                          id={controlItem.name}
                          name={controlItem.name}
                          value={formData[controlItem.name]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [controlItem.name]: e.target.value,
                            })
                          }
                          className="w-full bg-white/60 dark:bg-gray-700/60 border border-gray-300/50 dark:border-gray-600/50 rounded-xl text-sm outline-none text-gray-800 dark:text-gray-100 py-3 px-4 resize-none leading-6 transition-all duration-400 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 dark:focus:ring-purple-500/50 dark:focus:border-purple-500 shadow-sm hover:shadow-md"
                          placeholder={controlItem.placeholder}
                          rows={5}
                        ></textarea>
                      ) : (
                        <input
                          id={controlItem.name}
                          name={controlItem.name}
                          type={controlItem.type}
                          value={formData[controlItem.name]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [controlItem.name]: e.target.value,
                            })
                          }
                          className="w-full bg-white/60 dark:bg-gray-700/60 border border-gray-300/50 dark:border-gray-600/50 rounded-xl text-sm outline-none text-gray-800 dark:text-gray-100 py-3 px-4 leading-6 transition-all duration-400 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 dark:focus:ring-purple-500/50 dark:focus:border-purple-500 shadow-sm hover:shadow-md"
                          placeholder={controlItem.placeholder}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {showSuccessMessage && (
                  <motion.div
                    className="p-2 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-teal-50/80 to-purple-50/80 dark:from-teal-900/30 dark:to-purple-900/30 border border-teal-200/50 dark:border-purple-700/50 rounded-xl p-4 shadow-lg">
                      <p className="text-sm font-semibold text-teal-600 dark:text-purple-400 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Your message was successfully delivered! I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                <motion.div
                  className="p-2 w-full mt-4"
                  variants={variants()}
                  initial="offscreen"
                  animate="onscreen"
                  custom={{ duration: 1 }}
                >
                  <button
                    disabled={!isValidForm() || isSubmitting}
                    onClick={handleSendMessage}
                    className="relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed w-full py-3 px-6 text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-teal-500 via-purple-600 to-indigo-600 rounded-xl hover:from-teal-600 hover:to-purple-700 transition-all duration-400 shadow-lg hover:shadow-xl group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                        Send Message
                      </span>
                    )}
                  </button>
                </motion.div>
                
                <motion.div 
                  className="p-2 w-full text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Or reach out directly at{" "}
                    <a href="mailto:hello@example.com" className="text-teal-500 dark:text-purple-400 hover:underline font-medium transition-colors">
                      hello@example.com
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}