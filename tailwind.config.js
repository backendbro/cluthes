/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
        screens:{
            "3xl":"2000px",
        },
        colors: {"color_dark_1": "green"}
    },
  },
  plugins: [],
}
