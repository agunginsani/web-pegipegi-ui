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
    boxShadow: {
      none: '0 0 0 rgba(29, 30, 27, 0.2)',
      skim: '0 1px 4px rgba(29, 30, 27, 0.1)',
      lifted: '0 2px 8px rgba(29, 30, 27, 0.1)',
      raised: '0 2px 16px rgba(29, 30, 27, 0.1)',
      floating: '0 6px 24px rgba(29, 30, 27, 0.1)',
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
        75: '#FFD5A5',
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

      'red-flower': {
        50: '#FFF3ED',
        100: '#FFE4D5',
        200: '#FFBE9F',
        300: '#FF9C72',
        400: '#FD693A',
        500: '#FC4113',
        600: '#ED2609',
        700: '#C4180A',
        800: '#9C1510',
        900: '#7D1511',
      },
      'orange-inter': {
        50: '#FFF6EC',
        100: '#FFECD3',
        200: '#FFD5A5',
        300: '#FFB66D',
        400: '#FF8B32',
        500: '#FF6A0A',
        600: '#FE5000',
        700: '#CC3702',
        800: '#A12C0B',
        900: '#82270C',
      },
      'orange-flush': {
        50: '#FFFAEC',
        100: '#FFF4D3',
        200: '#FFE6A5',
        300: '#FFD26D',
        400: '#FFB332',
        500: '#FF9A0A',
        600: '#FF8200',
        700: '#CC5F02',
        800: '#A1490B',
        900: '#823E0C',
      },
      'yellow-candle': {
        50: '#FFFBE7',
        100: '#FFF8DB',
        200: '#FFF1B5',
        300: '#FFD30F',
        400: '#E6BE0E',
        500: '#CCA90C',
        600: '#BF9E0B',
        700: '#997F09',
        800: '#735F07',
        900: '#594A05',
      },
      'purple-affair': {
        50: '#F9F7FC',
        100: '#F2EEF9',
        200: '#E3DBF3',
        300: '#D0BFE8',
        400: '#B498DA',
        500: '#946FC6',
        600: '#7850A9',
        700: '#6E479A',
        800: '#523672',
        900: '#47305F',
      },
      'blue-dodger': {
        50: '#EFF8FF',
        100: '#DAEFFF',
        200: '#BDE4FF',
        300: '#90D5FF',
        400: '#5CBCFE',
        500: '#369DFB',
        600: '#1C7CF0',
        700: '#1868DD',
        800: '#1A53B3',
        900: '#1B498D',
      },
      'blue-scooter': {
        50: '#EFFBFC',
        100: '#D6F5F7',
        200: '#B3EAEE',
        300: '#7ED9E2',
        400: '#35BBCA',
        500: '#27A3B3',
        600: '#238497',
        700: '#236B7B',
        800: '#245866',
        900: '#224A57',
      },
      'green-emerald': {
        50: '#F2FBF5',
        100: '#E0F8E7',
        200: '#C2F0D1',
        300: '#93E2AE',
        400: '#50C878',
        500: '#36B15F',
        600: '#27924C',
        700: '#22733D',
        800: '#205B34',
        900: '#1C4B2E',
      },
      'green-deep-sea': {
        50: '#EBFEF6',
        100: '#D0FBE7',
        200: '#A4F6D4',
        300: '#6AEBBF',
        400: '#2FD8A3',
        500: '#0ABF8D',
        600: '#009B73',
        700: '#008264',
        800: '#03624C',
        900: '#045040',
      },
      'neutral-tuna': {
        0: '#FFFFFF',
        25: '#F6F6F9',
        50: '#EDEDF1',
        100: '#D7D8E0',
        200: '#B3B5C6',
        300: '#8A8DA6',
        400: '#6C708B',
        500: '#565973',
        600: '#47495D',
        700: '#3D3F4F',
        800: '#363744',
        900: '#30303B',
      },
    },
  },
};
