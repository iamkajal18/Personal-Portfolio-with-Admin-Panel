"use client";

import { useEffect, useState } from "react";
import { Link as LinkScroll, scroller } from "react-scroll";
import { useTheme } from "@/components/ThemeProvider";

const menuItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function CreateMenus({ activeLink, setActiveLink, isMobile = false }) {
  return menuItems.map((item) => (
    <LinkScroll
      key={item.id}
      activeClass="active"
      to={item.id}
      spy={true}
      smooth={true}
      duration={1000}
      onSetActive={() => setActiveLink(item.id)}
      className={`relative px-4 py-2 mx-1 cursor-pointer transition-all duration-300 font-medium rounded-xl group
        ${
          activeLink === item.id
            ? "text-white bg-gradient-to-r from-teal-500 to-purple-600 shadow-md"
            : "text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
        ${isMobile ? "text-base py-3 px-4 my-1" : "text-sm md:text-base"}
      `}
    >
      {item.label}
    </LinkScroll>
  ));
}

function ContactInfoBar({ theme, toggleTheme }) {
  return (
    <div className="fixed top-0 w-full z-40 bg-gradient-to-r from-teal-600 to-purple-600 text-white py-2 text-sm shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-1 md:mb-0">
          <a href="mailto:contact@example.com" className="flex items-center hover:text-teal-200 transition-colors duration-200 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@example.com
          </a>
          <div className="hidden sm:block text-sm">|</div>
          <a href="tel:+1234567890" className="flex items-center hover:text-teal-200 transition-colors duration-200 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +1 (234) 567-890
          </a>
        </div>
        <div className="flex items-center space-x-3">
          {/* Social Icons */}
          <a href="#" className="hover:text-teal-200 transition-colors duration-200 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.040 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#" className="hover:text-teal-200 transition-colors duration-200 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
            </svg>
          </a>
          <a href="#" className="hover:text-teal-200 transition-colors duration-200 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="#" className="hover:text-teal-200 transition-colors duration-200 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.230 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ isMenuOpen, setIsMenuOpen, activeLink, setActiveLink, theme, toggleTheme }) {
  return (
    <div className={`lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-teal-200/50 dark:border-purple-700/50 shadow-lg transition-all duration-300 ease-in-out ${
      isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
    }`}>
      <div className="px-4 py-5 flex flex-col space-y-3">
        {menuItems.map((item) => (
          <LinkScroll
            key={item.id}
            activeClass="active"
            to={item.id}
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => setActiveLink(item.id)}
            onClick={() => setIsMenuOpen(false)}
            className={`px-5 py-3 rounded-xl transition-all duration-300 font-medium text-base ${
              activeLink === item.id
                ? "text-white bg-gradient-to-r from-teal-500 to-purple-600 shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.label}
          </LinkScroll>
        ))}
        <button
          onClick={() => {
            scroller.scrollTo("contact", {
              duration: 1500,
              delay: 100,
              smooth: true,
            });
            setIsMenuOpen(false);
          }}
          className="mt-3 py-3 px-5 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:from-teal-600 hover:to-purple-700 transition-all duration-300 text-base"
        >
          Contact Me
        </button>
        {/* Mobile Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-2 py-3 px-4 border border-teal-200/50 dark:border-purple-700/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-base mt-2"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={theme === "dark" ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"} />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrollActive, setScrollActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollActive(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ContactInfoBar theme={theme} toggleTheme={toggleTheme} />
      
      {/* Main Navbar */}
      <header
        className={`fixed top-10 w-full z-30 transition-all duration-400 ${
          scrollActive
            ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md border-b border-teal-200/50 dark:border-purple-700/50"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <LinkScroll
              to="home"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => setActiveLink("home")}
              className="flex items-center gap-1.5 cursor-pointer group"
            >
              <div className="text-2xl text-gray-800 dark:text-gray-200 font-bold">Dev</div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                Portfolio
              </span>
            </LinkScroll>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-1">
            <CreateMenus
              setActiveLink={setActiveLink}
              activeLink={activeLink}
            />
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() =>
                scroller.scrollTo("contact", {
                  duration: 1500,
                  delay: 100,
                  smooth: true,
                })
              }
              className="ml-4 py-2.5 px-5 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-medium rounded-xl text-base shadow-md hover:shadow-lg hover:from-teal-600 hover:to-purple-700 transition-all duration-300 group"
            >
              <span className="flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                Contact Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 py-2 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none shadow-sm hover:shadow-md transition-all duration-200 bg-gray-100 dark:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-current transform transition duration-200 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-200 ease-in-out mt-1.5 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transform transition duration-200 ease-in-out mt-1.5 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        <MobileMenu 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </header>
    </>
  );
}