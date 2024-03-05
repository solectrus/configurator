/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        vote: 'vote 0.5s ease-in-out',
      },
      keyframes: {
        vote: {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(-1deg)',
          },
          '75%': {
            transform: 'rotate(1deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
