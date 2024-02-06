/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'desktop':{'min':'1024px' },
        'tablet':{'min':'768px', 'max':'1023px'},
        'phone':{'max': '767px'}
      }
    },
  },
  plugins: [],
};
