"use client";

import { useEffect, useState } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import { addData } from "@/services";

const controls = [
  {
    name: "name",
    placeholder: "Enter your name",
    type: "text",
    label: "Name",
  },
  {
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    label: "Email",
  },
  {
    name: "message",
    placeholder: "Enter your message",
    type: "text",
    label: "Message",
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

  async function handleSendMessage() {
    const res = await addData("contact", formData);
    console.log(res, "contact-res");

    if (res && res.success) {
      setFormData(initialFormData);
      setShowSuccessMessage(true);
    }
  }

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1500);
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

  console.log(isValidForm(), "isValidForm()");

  return (
    <div
      className="relative max-w-screen-xl mt-12 mb-8 px-4 sm:px-8 xl:px-12 mx-auto"
      id="contact"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/3 via-white to-purple-600/3 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />

      <AnimationWrapper className="py-6 sm:py-10">
        <motion.div
          className="flex flex-col justify-center items-center text-center"
          variants={variants()}
          initial="offscreen"
          animate="onscreen"
        >
          <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight font-['Inter',_sans-serif]">
            {(data?.contactHeading || "Contact Me").split(" ").map((item, index) => (
              <motion.span
                key={index}
                className={`${
                  data?.highlightIndices?.includes(index)
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
        </motion.div>
      </AnimationWrapper>

      <AnimationWrapper>
        <motion.div
          className="container px-5 mx-auto"
          variants={variants()}
          initial="offscreen"
          animate="onscreen"
          custom={{ duration: 0.9 }}
        >
          <div className="w-full max-w-lg mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:border-gradient-to-r hover:from-teal-500 hover:to-purple-600 transition-all duration-300">
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
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
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
                        className="w-full bg-transparent border border-gray-200 dark:border-gray-700 rounded-md h-32 text-sm outline-none text-gray-800 dark:text-gray-100 py-2 px-3 resize-none leading-6 focus:border-gradient-to-r focus:from-teal-500 focus:to-purple-600 transition-all duration-300"
                        placeholder={controlItem.placeholder}
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
                        className="w-full bg-transparent border border-gray-200 dark:border-gray-700 rounded-md text-sm outline-none text-gray-800 dark:text-gray-100 py-2 px-3 leading-6 focus:border-gradient-to-r focus:from-teal-500 focus:to-purple-600 transition-all duration-300"
                        placeholder={controlItem.placeholder}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
              {showSuccessMessage && (
                <motion.p
                  className="text-sm font-medium text-teal-500 dark:text-teal-400 my-2 w-full text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Your message was successfully delivered!
                </motion.p>
              )}
              <motion.div
                className="p-2 w-full"
                variants={variants()}
                initial="offscreen"
                animate="onscreen"
                custom={{ duration: 1 }}
              >
                <button
                  disabled={!isValidForm()}
                  onClick={handleSendMessage}
                  className="disabled:opacity-50 w-full py-3 px-6 text-white font-medium text-sm sm:text-base bg-gradient-to-r from-teal-500 to-purple-600 rounded-md hover:bg-gradient-to-r hover:from-teal-600 hover:to-purple-700 transition-all duration-300"
                >
                  Send Message
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}