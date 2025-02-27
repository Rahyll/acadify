/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      transitionProperty: {
        all: "all",
        transform: "transform",
        opacity: "opacity",
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
