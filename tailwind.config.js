/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "parchment": {
          50: "#fdf8ef",
          100: "#f5ead4",
          200: "#ecdbb5",
          300: "#e0c88e",
          400: "#d4b46a",
          500: "#c9a04e",
          600: "#b8873a",
          700: "#9a6d30",
          800: "#7d562b",
          900: "#664626",
        },
        "lorcana-gold": "#c5a55a",
        "lorcana-gold-light": "#dfc078",
        "lorcana-gold-dark": "#9a7b3a",
        "lorcana-cream": "#f0e6d0",
        "lorcana-brown": "#3a2d1a",
        "lorcana-brown-light": "#5a4a30",
        "lorcana-dark": "#1a1410",
        "lorcana-navy": "#0c1324",
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(197, 165, 90, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(197, 165, 90, 0.6)' },
        },
        'spin-coin': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(1080deg)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-down': 'slide-down 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'spin-coin': 'spin-coin 2s ease-in-out',
      },
    },
  },
  plugins: [],
}
