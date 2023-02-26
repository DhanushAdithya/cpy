import { motion } from "framer-motion";

const Toast = ({ show, msg }: { show: boolean; msg: string }) => {
	return show ? (
		<motion.div
			key="toast"
			initial={{ opacity: 0, scale: 0.7, y: 200, x: "-50%" }}
			animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
			exit={{ opacity: 0, scale: 0.7, y: 200, x: "-50%" }}
			className="w-96 py-2 rounded bg-gray-400 dark:bg-secondary-dark text-font-light dark:text-font-dark fixed bottom-6 left-1/2 -translate-x-1/2 text-center z-50"
		>
			{msg}
		</motion.div>
	) : null;
};

export default Toast;
