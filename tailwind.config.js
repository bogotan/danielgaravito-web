/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0D1117',
          secondary: '#161B22',
        },
        accent: {
          green: '#1565C0',
          blue: '#13AFF0',
          gold: '#F07B2E',
        },
        text: {
          DEFAULT: '#E6EDF3',
          muted: '#8B949E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(240, 123, 46, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(240, 123, 46, 0.6), 0 0 40px rgba(240, 123, 46, 0.2)' },
        },
      },
    },
  },
  plugins: [],
};
