/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'unsaac-blue': '#003366',
        'unsaac-orange': '#FFA500',
      }
    },
  },
  plugins: [],
}