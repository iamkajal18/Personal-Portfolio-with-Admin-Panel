"use client";

import { useEffect, useState } from "react";
import { Link as LinkScroll, scroller } from "react-scroll";

const menuItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function CreateMenus({ activeLink, getMenuItems, setActiveLink }) {
  return getMenuItems.map((item) => (
    <LinkScroll
      key={item.id}
      activeClass="active"
      to={item.id}
      spy={true}
      smooth={true}
      duration={1000}
      onSetActive={() => setActiveLink(item.id)}
      className={`relative px-4 py-2 mx-2 cursor-pointer transition-all duration-300 font-medium text-base
        ${
          activeLink === item.id
            ? "text-white bg-gradient-to-r from-teal-500 to-purple-600 shadow-lg rounded-md"
            : "text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-md"
        }
      `}
    >
      {item.label}
    </LinkScroll>
  ));
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollActive(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <header
        className={`fixed top-0 w-full z-30 transition-all duration-300 ${
          scrollActive
            ? "bg-white/95 shadow-md backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 py-3 flex items-center justify-between">
          {/* Logo */}
         <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 flex justify-center items-center rounded-md bg-gradient-to-br from-teal-500 to-purple-600 shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white text-xl font-bold">P</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              ortfolio
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center">
            <CreateMenus
              setActiveLink={setActiveLink}
              activeLink={activeLink}
              getMenuItems={menuItems}
            />
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <button
              onClick={() =>
                scroller.scrollTo("contact", {
                  duration: 1500,
                  delay: 100,
                  smooth: true,
                })
              }
              className="ml-6 py-2 px-5 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-lg text-lg hover:from-teal-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Me
            </button>
          </div>
        </nav>
      </header>

      {/* Bottom Mobile Navbar */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white to-gray-50/95 shadow-t-lg backdrop-blur-md border-t border-gray-200">
        <div className="px-4">
          <ul className="flex justify-between items-center py-3 overflow-x-auto">
            <CreateMenus
              setActiveLink={setActiveLink}
              activeLink={activeLink}
              getMenuItems={menuItems}
            />
          </ul>
        </div>
      </nav>
    </>
  );
}