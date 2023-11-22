module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: `var(--background)`,
        text: `var(--text)`,
        primary: `var(--primary)`,
        "primary-text": `var(--primary-text)`,
        secondary: `var(--secondary)`,
        "secondary-text": `var(--secondary-text)`,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
