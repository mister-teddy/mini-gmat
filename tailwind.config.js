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
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "18px"],
      base: ["16px", "22px"],
      lg: ["18px", "22px"],
      xl: ["24px", "32px"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
