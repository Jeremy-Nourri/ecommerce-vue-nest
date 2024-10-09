/** @type {import('tailwindcss').Config} */

import aspectRatio from '@tailwindcss/aspect-ratio'


export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7A22E',
        secondary: "#8D2B9C"
      },
    },
  },
  plugins: [
    aspectRatio,
  ],
}

