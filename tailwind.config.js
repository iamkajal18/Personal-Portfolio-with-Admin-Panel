/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark: variants based on .dark class on <html>
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};