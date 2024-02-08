/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'desktop':{'min':'1241px' },
        'tablet':{'min':'768px', 'max':'1240px'},
        'phone':{'max': '767px'}
      }
    },
  },
  plugins: [
      /*'postcss-nesting'*/
  ],
};
