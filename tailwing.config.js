/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'property-brown': '#8B4513',
        'property-lightblue': '#87CEEB',
        'property-pink': '#FF1493',
        'property-orange': '#FFA500',
        'property-red': '#DC143C',
        'property-yellow': '#FFD700',
        'property-green': '#228B22',
        'property-blue': '#0000CD',
      },
    },
  },
  plugins: [],
}
