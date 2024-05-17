/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
          'swiss': "url(WebHouse/src/assets/swiss.jpg)",
        }
    },
  },
  plugins: [],
}

