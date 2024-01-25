/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#4690f1',
        dark: '#242424',
        light: '#f9f9f9',
        gray: '#f3f3f3'
      }
    },
  },
  plugins: [],
}

