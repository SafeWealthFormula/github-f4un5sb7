/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'progress-grow': 'progress-grow 3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gentle': 'pulse 3s ease-in-out infinite',
        'pulse-1': 'pulse 1.5s ease-in-out infinite',
        'pulse-2': 'pulse 1.5s ease-in-out infinite 0.2s',
        'pulse-3': 'pulse 1.5s ease-in-out infinite 0.4s',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'progress-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
};