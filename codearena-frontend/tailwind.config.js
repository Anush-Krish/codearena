/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // <- include this if using Vite
    "./src/**/*.{js,ts,jsx,tsx}", // <- include all your React source files
  ],

  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
