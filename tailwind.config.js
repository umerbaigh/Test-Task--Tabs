/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },

      colors: {
        primary: "#0B84F3",
        secondary: "#e3e3e3",
        charcol: "#272526",
      },

      fontSize: {
        large: "45px",
        medium: "24px",
        small: "16px",
      },
    },
  },
  plugins: [],
};
