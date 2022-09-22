const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        400: '400ms',
      },
      width: {
        '1/7': 'calc(100% / 7)',
      },
      fontSize: {
        xxs: '0.5rem',
        xs: '0.75rem',
      },
      lineHeight: {
        2: '0.5rem',
      },
      screens: {
        xs: { max: '400px' },
        sm: { max: '768px' },
        hd: '1360px',
        fhd: '1920px',
        uhd: '3840px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '2xl': '40rem',
      },
      colors: {
        emerald: {
          50: '#e4fff1',
          100: '#bdffdb',
          200: '#8affc3',
          300: '#2effa8',
          400: '#00fb90',
          500: '#00f57d',
          600: '#00e371',
          700: '#00ce62',
          800: '#00bc56',
          900: '#009a3f',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
