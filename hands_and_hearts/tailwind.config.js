/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        trebuchet: ['"Trebuchet MS"', "sans-serif"],
      },
      colors: {
        customGray: "#3D3D3D",
        customLavender: "#F3E8FF",
        customPurple: "#CDB4DB",
        customOrange: "#FF8C42",
      },
    },
  },
  plugins: [],
};
