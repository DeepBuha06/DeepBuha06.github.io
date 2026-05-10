/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#F5F1EC',
          card: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#1D1D1F',
          secondary: '#48484A',
          tertiary: '#8E8E93',
          faint: '#C7C7CC',
        },
        warm: {
          DEFAULT: '#9B7B5B',
          hover: '#876A4D',
          bg: 'rgba(155, 123, 91, 0.07)',
          border: 'rgba(155, 123, 91, 0.15)',
        },
        border: 'rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      maxWidth: {
        reading: '680px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
