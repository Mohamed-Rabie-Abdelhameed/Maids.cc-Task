/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f42f0",
        secondary: "#3a30b8",
        tertiary: "#9090C0",
        dark: "#242424",
        light: "#f9f9f9",
        gray: "#f3f3f3",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
