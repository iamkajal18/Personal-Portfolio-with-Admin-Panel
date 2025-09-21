
"use client";

import { useEffect, useState } from "react";
import { Link as LinkScroll, scroller } from "react-scroll";

// Mock theme hook for demo - replace with your actual useTheme
const useTheme = () => {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Apply theme to document
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  
  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  return { theme, toggleTheme };
};

const menuItems = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "project", label: "Projects", icon: "🚀" },
];

function CreateMenus({ activeLink, setActiveLink, isMobile = false, showIcons = false }) {
  return menuItems.map((item) => (
    <LinkScroll
      key={item.id}
      activeClass="active"
      to={item.id}
      spy={true}
      smooth={true}
      duration={1000}
      onSetActive={() => setActiveLink(item.id)}
      className={`relative px-4 py-2 mx-1 cursor-pointer transition-all duration-300 font-bold text-[#000000] rounded-xl group overflow-hidden
        ${
          activeLink === item.id && item.id === "home"
            ? "dark:text-gray-300"
            : activeLink === item.id
            ? "text-white bg-[#3c6e71] shadow-lg transform scale-105"
            : "hover:text-white hover:bg-[#3c6e71] hover:bg-opacity-90"
        }
        ${isMobile ? "text-base py-3 px-4 my-1" : "text-sm md:text-base"}
      `}
    >
      <div className={`absolute inset-0 bg-[#3c6e71] transition-all duration-300 ${
        activeLink === item.id && item.id !== "home" ? "opacity-100" : "opacity-0 group-hover:opacity-10"
      }`} />
      
      <span className="relative flex items-center gap-2">
        {showIcons && <span className="text-sm">{item.icon}</span>}
        {item.label}
      </span>
      
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#3c6e71] transition-all duration-300 ${
        activeLink === item.id ? "w-full" : "group-hover:w-3/4"
      }`} />
    </LinkScroll>
  ));
}

function ContactInfoBar({ theme, toggleTheme }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`fixed top-0 w-full z-40 bg-[#3c6e71] text-white py-2 text-sm shadow-md transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "translate-y-0"
    }`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-1 md:mb-0">
          <a href="mailto:contact@example.com" className="flex items-center hover:text-[#3c6e71] transition-all duration-200 text-sm group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">contact@example.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <div className="hidden sm:block text-white/60">|</div>
          <a href="tel:+1234567890" className="flex items-center hover:text-[#3c6e71] transition-all duration-200 text-sm group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">+1 (234) 567-890</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          {[
            { name: "Twitter", path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.040 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
            { name: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.370-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.920-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
            { name: "GitHub", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }
          ].map((social, index) => (
            <a key={social.name} href="#" className="hover:text-[#3c6e71] transition-all duration-200 group relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 group-hover:scale-110 transition-all duration-200" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d={social.path} />
              </svg>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {social.name}
              </div>
            </a>
          ))}
          
          <div className="relative">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-300 group relative overflow-hidden"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <div className="relative z-10">
                {theme === "dark" ? (
                  <svg className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ isMenuOpen, setIsMenuOpen, activeLink, setActiveLink, theme, toggleTheme }) {
  return (
    <div className={`lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-[#3c6e71]/50 dark:border-[#3c6e71]/50 shadow-xl transition-all duration-300 ease-in-out ${
      isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
    }`}>
      <div className="px-4 py-5 flex flex-col space-y-3">
        {menuItems.map((item, index) => (
          <LinkScroll
            key={item.id}
            activeClass="active"
            to={item.id}
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => setActiveLink(item.id)}
            onClick={() => setIsMenuOpen(false)}
            className={`px-5 py-3 rounded-xl transition-all duration-300 font-bold text-[#000000] text-base relative overflow-hidden group ${
              activeLink === item.id && item.id === "home"
                ? "dark:text-gray-300"
                : activeLink === item.id
                ? "text-white bg-[#3c6e71] shadow-lg"
                : "dark:text-gray-300 hover:bg-[#3c6e71] hover:bg-opacity-90"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="flex items-center gap-3 relative z-10">
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </span>
          </LinkScroll>
        ))}
        
        <LinkScroll
          to="contact"
          spy={true}
          smooth={true}
          duration={1000}
          onSetActive={() => setActiveLink("contact")}
          onClick={() => setIsMenuOpen(false)}
          className={`px-5 py-3 rounded-xl transition-all duration-300 font-bold text-[#000000] text-base relative overflow-hidden group ${
            activeLink === "contact"
              ? "text-white bg-[#3c6e71] shadow-lg"
              : "dark:text-gray-300 hover:bg-[#3c6e71] hover:bg-opacity-90"
          }`}
          style={{ animationDelay: `${menuItems.length * 50}ms` }}
        >
          <span className="flex items-center gap-3 relative z-10">
            <span className="text-lg">📧</span>
            Contact
          </span>
        </LinkScroll>
        
        <button
          onClick={() => {
            scroller.scrollTo("contact", {
              duration: 1500,
              delay: 100,
              smooth: true,
            });
            setIsMenuOpen(false);
          }}
          className="mt-3 py-3 px-5 bg-[#3c6e71] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#2f5a5d] transition-all duration-300 text-base group relative overflow-hidden"
        >
          <span className="flex items-center justify-center gap-2 relative z-10 group-hover:scale-105 transition-transform">
            📧 Get In Touch
          </span>
        </button>
        
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-[#3c6e71]/50 dark:border-[#3c6e71]/50 rounded-xl text-[#000000] dark:text-gray-300 font-bold hover:bg-[#F5F5F5] dark:hover:bg-gray-800 hover:border-[#3c6e71] dark:hover:border-[#3c6e71] transition-all duration-300 text-base mt-2 group"
        >
          <div className="p-1 rounded-full bg-[#3c6e71] group-hover:scale-110 transition-transform">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={theme === "dark" ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"} />
            </svg>
          </div>
          <span className="font-medium">
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </span>
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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollActive(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <ContactInfoBar theme={theme} toggleTheme={toggleTheme} />
      
      <header
        className={`fixed top-10 w-full z-30 transition-all duration-400 ${
          scrollActive
            ? "bg-white/95 dark:bg-gray-900/95 shadow-xl backdrop-blur-md border-b border-[#3c6e71]/50 dark:border-[#3c6e71]/50"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <LinkScroll
              to="home"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => setActiveLink("home")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative">
                <div className="text-2xl text-[#000000] dark:text-gray-200 font-bold group-hover:scale-105 transition-transform duration-300">
                  Dev
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3c6e71] group-hover:w-full transition-all duration-300" />
              </div>
              <span className="text-2xl font-bold bg-[#3c6e71] bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                Portfolio
              </span>
              <div className="ml-1 w-2 h-2 bg-[#3c6e71] rounded-full animate-pulse" />
            </LinkScroll>
          </div>

          <ul className="hidden lg:flex items-center space-x-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl px-4 py-2 border border-[#3c6e71]/50 dark:border-[#3c6e71]/50">
            <CreateMenus
              setActiveLink={setActiveLink}
              activeLink={activeLink}
              showIcons={false}
            />
          </ul>

          <div className="hidden lg:flex items-center">
            <LinkScroll
              to="contact"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => setActiveLink("contact")}
              className={`py-3 px-6 font-bold text-[#000000] rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden cursor-pointer ${
                activeLink === "contact"
                  ? "text-white bg-[#3c6e71]"
                  : "bg-white/80 dark:bg-gray-800/80 hover:bg-[#3c6e71] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2 relative z-10 group-hover:translate-x-0.5 transition-transform">
                Contact
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </LinkScroll>
          </div>

          <button
            className="lg:hidden flex flex-col justify-center items-center w-12 h-12 rounded-xl text-[#000000] dark:text-gray-300 font-bold focus:outline-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-[#3c6e71]/50 dark:border-[#3c6e71]/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out mt-1.5 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out mt-1.5 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </nav>

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