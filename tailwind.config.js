/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://i.ibb.co/mtJXZF8/Untitled-design-6.png')"
      },
      colors: {
        'main': '#007456',
      },
    },
  },
  plugins: [require("daisyui")],
}

