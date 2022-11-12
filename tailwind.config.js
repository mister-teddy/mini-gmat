module.exports = {
  darkMode: "class",
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#04006C',
        secondary: '#38D7F4'
      },
    },
    fontSize: {
      sm: ['14px', '18px'],
      base: ['16px', '22px'],
      lg: ['18px', '22px'],
      xl: ['24px', '32px'],
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
};
