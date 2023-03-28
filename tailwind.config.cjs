const libConfig = require('./src/runtime/tailwind.config.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  ...libConfig,
};
