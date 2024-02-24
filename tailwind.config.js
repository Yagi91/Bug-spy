/** @type {import('tailwindcss').Config} */ // This line is required for VSCode to recognize the config file
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", 'node_modules/flowbite-react/lib/esm/**/*.js'],
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
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
