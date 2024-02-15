/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite-react/lib/esm/**/*.js"],
    theme: {
        extend: {
            screens: {
                'desktop': {'min': '1241px'},
                'tablet': {'min': '768px', 'max': '1240px'},
                'phone': {'max': '767px'}
            }
        },
    },
    plugins: [
        // eslint-disable-next-line no-undef
        require('flowbite/plugin'),
    ],
    darkMode:"class"
};
