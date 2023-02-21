import { motion } from "framer-motion";
import type { FC } from "react";
import type { Icon } from "react-feather";

type SidebarItemType = {
	Icon: Icon;
	text: string;
	onClick?: () => void;
};

const SidebarItem: FC<SidebarItemType> = ({ Icon, text, onClick }) => {
	return (
		<motion.button
			whileTap={{ scale: 0.97 }}
			className="sidebar-item"
			onClick={onClick}
		>
			<div className="flex items-center justify-center md:justify-start md:w-full md:h-full w-6 h-6">
				<Icon size={18} className="md:mr-2" />
				<span className="text">{text}</span>
			</div>
		</motion.button>
	);
};

export default SidebarItem;
