/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const linkHover = {
                ".linkHover": {
                    transition: "all 0.2s ease-in-out",
                },
            };
            addUtilities(linkHover, ["hover"]);
        },
    ],
};
