/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        /*'xs': {'max':'570px'}*/
        'desktop':{'min':'1440px'},
        'tablet':{'min':'810px', 'max':'1440px'},
        'phone':{'max': '810px'}
      }
    },
  },
  plugins: [],
};
