/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:"#FF7622",
        secondary:"#1E1E2E"
      },
      fontFamily: {
        senRegular: ["senRegular", "sans-serif"],
        senBold: ["senBold", "sans-serif"],
        senExtraBold: ["senExtraBold", "sans-serif"],
        senMedium: ["senMedium", "sans-serif"],
        senSemiBold: ["senSemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
