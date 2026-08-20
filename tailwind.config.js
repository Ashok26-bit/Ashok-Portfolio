/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#96C2DB',
          light: '#B3D4E6',
          dark: '#3A637B',
          darker: '#223E4F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F8FAFC',
          muted: '#E5EDF1',
          subtle: '#EEF4F7',
          card: '#FFFFFF',
          border: '#D3E2EB',
        },
        content: {
          primary: '#17212B',
          secondary: '#52616B',
          muted: '#7A8C98',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(150, 194, 219, 0.25)',
        'card': '0 2px 12px 0 rgba(23, 33, 43, 0.04)',
        'hover': '0 8px 30px rgba(58, 99, 123, 0.12)',
        'dropdown': '0 10px 40px -10px rgba(23, 33, 43, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
