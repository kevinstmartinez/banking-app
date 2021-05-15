module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'header': '#1a202c',
      'sidebar': '#2d3749'
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
