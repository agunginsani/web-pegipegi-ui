const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
      },
      animation: {
        ripple: 'ripple 0.6s linear',
      },
      fontFamily: {
        sans: ['Proxima Nova', ...defaultTheme.fontFamily.sans],
        lato: 'Lato',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      purple: {
        900: '#211331',
        800: '#2c1941',
        700: '#372052',
        600: '#4d2c72',
        500: '#633993',
        400: '#6E3FA3',
        300: '#8b65b5',
        200: '#9a79bf',
        100: '#b79fd1',
        50: '#d4c5e3',
        25: '#f1ecf6',
      },
      red: {
        900: '#430700',
        800: '#5A0A00',
        700: '#710D00',
        600: '#9E1200',
        500: '#CB1700',
        400: '#E11900',
        300: '#E74733',
        200: '#EA5E4D',
        100: '#F08C80',
        50: '#F6BAB3',
        25: '#FCE8E6',
      },
      blue: {
        900: '#112141',
        800: '#172c57',
        700: '#1d386d',
        600: '#284e99',
        500: '#3364c4',
        400: '#396FDA',
        300: '#618ce1',
        200: '#749ae5',
        100: '#9cb7ed',
        50: '#c4d4f4',
        25: '#ebf1fb',
      },
      orange: {
        900: '#4C1800',
        800: '#662000',
        700: '#7F2800',
        600: '#B23800',
        500: '#E54800',
        400: '#FE5000',
        300: '#FE7333',
        200: '#FE854D',
        100: '#FFA880',
        50: '#FFCBB3',
        25: '#FFEEE6',
      },
      yellow: {
        500: '#EFBA03',
      },
      gray: {
        900: '#1D1E1B',
        800: '#333431',
        700: '#4A4A48',
        600: '#60615F',
        500: '#777876',
        400: '#8E8E8D',
        300: '#A4A5A3',
        200: '#BBBBBA',
        100: '#D1D2D1',
        50: '#E8E8E8',
      },
      platinum: {
        800: '#434d51',
        700: '#4d585d',
        600: '#576369',
        500: '#616F75',
        400: '#808b90',
        300: '#a0a8ac',
        200: '#bfc5c7',
        100: '#dfe2e3',
        50: '#eff0f1',
      },
      neutral: {
        50: '#EDEDF1',
      },
    },
  },
};
