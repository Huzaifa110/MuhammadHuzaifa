module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'zoom-in': 'zoomIn 1s ease-out forwards',
      },
      keyframes: {
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Lora', 'serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

