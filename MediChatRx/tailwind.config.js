/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-regular": "Poppins-Regular",
        "poppins-bold": "Poppins-Bold",
        "poppins-italic": "Poppins-Italic",
        "poppins-light": "Poppins-Light",
        "poppins-boldItalic": "Poppins-BoldItalic",
        "poppins-black": "Poppins-Black",
        "lexend-regular": "Lexend-Regular",
        "lexend-bold": "Lexend-Bold"
      },
    },
  },
  plugins: [],
};
