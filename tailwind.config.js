/** @type {import('tailwindcss').Config} */ // This line is required for VSCode to recognize the config file
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.red,
        accent: colors.green,
        neutral: colors.gray,
      },
      fontFamily: {
        inter: ["Inter Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  },
};
