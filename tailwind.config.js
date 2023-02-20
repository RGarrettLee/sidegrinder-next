/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'animation': {
        'gradient': 'gradient 2s ease-in-out infinite',
        'fade-in': 'fade-in 1.5s ease-in'
      },
      'keyframes': {
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'fade-in': {
          '0%': {
            'opacity': 0
          },
          '100%': {
            'opacity': 1
          }
        }
      },
    },
  },
  plugins: [],
}
