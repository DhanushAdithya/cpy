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
			className="select-none cursor-pointer p-2 rounded-md fixed bottom-6 right-6"
			onClick={toggleTheme}
		>
			{theme && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
		</motion.button>
	);
};

export default ThemeToggle;
