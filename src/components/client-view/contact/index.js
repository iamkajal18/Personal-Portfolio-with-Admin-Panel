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
      y: 30,
      opacity: 0,
    },
    onscreen: ({ duration = 0.6 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "ease",
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
      {/* Subtle Gradient Fade Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3c6e71]/10 via-white/80 to-[#3c6e71]/10 dark:from-[#3c6e71]/30 dark:via-gray-900/80 dark:to-[#3c6e71]/30" />
      </div>

      <AnimationWrapper className="py-8 sm:py-12">
        <motion.div
          className="flex flex-col justify-center items-center text-center mb-12"
          variants={variants()}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#000000] dark:text-gray-100 font-inter">
              {(data?.contactHeading || "Get In Touch").split(" ").map((item, index) => (
                <motion.span
                  key={index}
                  className={`inline-block ${
                    index === 1 || index === 2
                      ? "text-[#3c6e71]"
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {item}{" "}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {data?.contactSubheading || "Let&apos;s discuss your project and how I can help bring your ideas to life"}
          </motion.p>
        </motion.div>
      </AnimationWrapper>

      <AnimationWrapper>
        <motion.div
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
          variants={variants()}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          custom={{ duration: 0.7 }}
        >
          {/* Left Side - Illustration */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <motion.div 
              className="relative w-full max-w-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-[#3c6e71]/5 to-[#3c6e71]/5 dark:from-[#3c6e71]/20 dark:to-[#3c6e71]/10 rounded-2xl p-6 border border-[#3c6e71]/20 shadow-sm">
                <div className="aspect-square w-full relative rounded-xl overflow-hidden">
                  <Image
                    src="/contact.jpg"
                    alt="Contact Illustration"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-bold text-[#000000] dark:text-gray-100 mb-2">Let&apos;s Work Together</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    I&apos;m always interested in new challenges and opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-3/5">
            <div className="w-full max-w-lg mx-auto bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 sm:p-8 border border-[#3c6e71]/20 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-wrap -m-2">
                {controls.map((controlItem, index) => (
                  <motion.div
                    key={controlItem.name}
                    className="p-2 w-full"
                    variants={variants()}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true }}
                    custom={{ duration: 0.6 + index * 0.1 }}
                  >
                    <div className="relative">
                      <label className="block text-sm font-semibold text-[#000000] dark:text-gray-200 mb-2 flex items-center gap-2">
                        <span className="text-[#3c6e71]">
                          {controlItem.icon}
                        </span>
                        {controlItem.label}
                      </label>
                      {controlItem.name === "message" ? (
                        <motion.textarea
                          id={controlItem.name}
                          name={controlItem.name}
                          value={formData[controlItem.name]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [controlItem.name]: e.target.value,
                            })
                          }
                          className="w-full bg-[#3c6e71]/5 dark:bg-[#3c6e71]/20 border border-[#3c6e71]/20 rounded-xl text-sm outline-none text-gray-800 dark:text-gray-100 py-3 px-4 resize-none leading-6 transition-all duration-300 focus:ring-2 focus:ring-[#3c6e71]/30 focus:border-[#3c6e71] dark:focus:ring-[#3c6e71]/20 dark:focus:border-[#5c9ea1] shadow-sm hover:shadow-md"
                          placeholder={controlItem.placeholder}
                          rows={5}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                        />
                      ) : (
                        <motion.input
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
                          className="w-full bg-[#3c6e71]/5 dark:bg-[#3c6e71]/20 border border-[#3c6e71]/20 rounded-xl text-sm outline-none text-gray-800 dark:text-gray-100 py-3 px-4 leading-6 transition-all duration-300 focus:ring-2 focus:ring-[#3c6e71]/30 focus:border-[#3c6e71] dark:focus:ring-[#3c6e71]/20 dark:focus:border-[#5c9ea1] shadow-sm hover:shadow-md"
                          placeholder={controlItem.placeholder}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {showSuccessMessage && (
                  <motion.div
                    className="p-2 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="bg-[#3c6e71]/10 border border-[#3c6e71]/20 rounded-xl p-4 shadow-sm">
                      <p className="text-sm font-semibold text-[#3c6e71] flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Your message was successfully delivered! I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                <motion.div
                  className="p-2 w-full mt-4"
                  variants={variants()}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  custom={{ duration: 0.7 }}
                >
                  <motion.button
                    disabled={!isValidForm() || isSubmitting}
                    onClick={handleSendMessage}
                    className="relative disabled:opacity-50 disabled:cursor-not-allowed w-full py-3 px-6 text-white font-semibold text-sm sm:text-base bg-[#3c6e71] rounded-xl hover:bg-[#2f5a5d] transition-all duration-300 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
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
                  </motion.button>
                </motion.div>
                
                <motion.div 
                  className="p-2 w-full text-center mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Or reach out directly at{" "}
                    <a href="mailto:hello@example.com" className="text-[#3c6e71] hover:underline font-medium transition-colors">
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