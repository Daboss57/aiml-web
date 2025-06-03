/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#D9E4FF',
          200: '#B3C9FF',
          300: '#8CADFF',
          400: '#6492FF',
          500: '#3D77FF',
          600: '#0A2463',
          700: '#081D4F',
          800: '#05153B',
          900: '#030C27',
        },
        secondary: {
          50: '#E6F7FF',
          100: '#CCEEFF',
          200: '#99DDFF',
          300: '#66CCFF',
          400: '#33BBFF',
          500: '#3E92CC',
          600: '#0074B3',
          700: '#005580',
          800: '#00364D',
          900: '#00171A',
        },
        accent: {
          50: '#E6FFF9',
          100: '#CCFFF2',
          200: '#99FFE5',
          300: '#66FFD9',
          400: '#33FFCC',
          500: '#2CA58D',
          600: '#00CC99',
          700: '#009973',
          800: '#00664D',
          900: '#003326',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      spacing: {
        '4xs': '2px',
        '3xs': '4px',
        '2xs': '8px',
        xs: '12px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};