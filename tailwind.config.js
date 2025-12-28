/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF10F0',
        'neon-blue': '#00F0FF',
        'neon-green': '#39FF14',
        'neon-yellow': '#FFFF00',
        'pastel-pink': '#FFB3D9',
        'pastel-purple': '#D4BBFF',
        'pastel-blue': '#B3E5FF',
      },
      fontFamily: {
        'cursed': ['Creepster', 'cursive'],
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'wiggle': 'wiggle 0.3s ease-in-out infinite',
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}
