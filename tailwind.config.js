/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./*.html",
    "./assets/**/*.js",
    "./**/*.html"],
  safelist: [
    'mt-6', 'p-6', 'bg-white', 'rounded-2xl', 'shadow-lg', 'border', 'border-pink-200',
    'text-2xl', 'font-bold', 'text-center', 'mb-6', 'text-pink-600', 'space-y-3',
    'grid', 'grid-cols-2', 'p-3', 'bg-pink-100', 'rounded-xl', 'font-semibold',
    'text-pink-700', 'text-left', 'text-right', 'font-medium', 'text-sm', 'text-gray-600'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
