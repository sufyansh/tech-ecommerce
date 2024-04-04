module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#243E8B",
        secondary: {
          100: "#000000",
          200: "#F8E3B4",
        },
      },
      textColor: {
        primary: "#243E8B",
        secondary: {
          100: "#000000",
          200: "#F8E3B4",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
