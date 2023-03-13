import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "react-feather";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	const toggleTheme = (): void => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<motion.button
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.8 }}
			className={`select-none cursor-pointer p-2 rounded-md fixed right-6 ${
				window.location.pathname === "/" ? "bottom-8" : "bottom-20"
			} md:bottom-6`}
			onClick={toggleTheme}
		>
			{theme && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
		</motion.button>
	);
};

export default ThemeToggle;
