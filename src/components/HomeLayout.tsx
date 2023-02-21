import { motion } from "framer-motion";

type Props = {
	children: React.ReactNode;
};

const pageTransition = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
};

const HomeLayout = ({ children }: Props) => (
	<motion.div
		variants={pageTransition}
		initial="hidden"
		animate="show"
		exit="hidden"
	>
		{children}
	</motion.div>
);

export default HomeLayout;
