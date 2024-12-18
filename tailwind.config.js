/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center:true
      },
      fontFamily:{
        'OverPass' : ["Overpass", "sans-serif"],
        'Nunito' : [ "Nunito", "sans-serif" ]
      },
      colors:{
        brandColor: "#444B59"
      },
    },
  },
  plugins: [],
}