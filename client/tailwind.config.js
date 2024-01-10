/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,tsx}'
  ],
  theme: {
    colors: {
      'custom-black': '#131315',
      'custom-orange': '#ff5e1a',
      'custom-green': '#1DB954'
    },
    extend: {
      backgroundImage: {
        'custom-pattern': "url('https://www.transparenttextures.com/patterns/brick-wall-dark.png')"
      }
    }
  },
  plugins: []
}
