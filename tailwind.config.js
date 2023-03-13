/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			display: ['"DM Serif Display", serif'],
			sans: ['"DM Sans"', "sans-serif"],
			dmserif: ['"DM Serif Display", serif'],
		},
		extend: {
			colors: {
				dark: "#1A0634",
				"secondary-dark": "#2B0D52",
				"sidebar-dark": "#1C073A",
				"card-dark": "#210A3F",
				"font-dark": "#ffffff",
				light: "#E5FAE6",
				secondary: "#F5F5F5",
				sidebar: "#ffffff",
				card: "#f5f5f5",
				"font-light": "#000000",
			},
			backgroundImage: {
				"blob-light": "url('/bg-light.svg')",
				"blob-dark": "url('/bg.svg')",
			},
		},
	},
	plugins: [],
};
