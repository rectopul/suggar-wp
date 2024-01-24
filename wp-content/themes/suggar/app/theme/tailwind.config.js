/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pop': ['Poppins', 'sans'],
        'inter': ['Inter', 'sans'],
      },
      fontSize: {
        '6xl': '6rem',
        '5xl': '4.5rem',
      },
      width: {
        'inherit': 'inherit'
      },
      boxShadow: {
        'footer': '0 0 16px 0 #0000000d'
      },
      colors: {
        'greenLight-100': '#1ea79f',
        'accent': '#1ea79f',
        'lime-green': '#1ea79f',
        'heading': '#737b97',
        'accent-rgb': 'rgba(3, 181, 181, 0.06)',
        'brown': '#3f3f3f',
        'blackText': '#3A3A3A',
        'cinza2': '#D3D3D3'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

