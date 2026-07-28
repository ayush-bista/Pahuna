/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF8",
        stone: "#E8E4DC",
        charcoal: "#1A1A1A",
        muted: "#6B6B6B",
        terra: "#B85C38",
        sage: "#4A6741",
        blush: "#F2EDE8",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};