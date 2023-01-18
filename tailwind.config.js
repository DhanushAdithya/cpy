/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: ['"DM Sans"', "sans-serif"],
			dmserif: ['"DM Serif Display", serif'],
		},
		extend: {},
	},
	plugins: [],
};
