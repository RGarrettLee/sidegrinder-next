/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'monsac': 'url(../public/monsac.cur), default'
      },
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
      fontFamily: {
        vcrosdneue: ["VCRosdNEUE", "sans-serif"],
        minecraftia: ["Minecraftia", "serif"],
        zpix: ["Zpix", "serif"],
        pixelmplus10: ["PixelMplus10"],
        pixelmplus12: ["PixelMplus12"]
      },
    },
  },
  plugins: [],
}
