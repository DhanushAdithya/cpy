import { useAuth } from "~/context";
import { motion } from "framer-motion";
import { MouseEvent, useState } from "react";
import {
	Archive,
	Folder,
	Hash,
	HelpCircle,
	MoreHorizontal,
	Settings,
	LogOut,
	Icon,
	Plus,
} from "react-feather";
import ThemeToggle from "./ThemeToggle";

const Item = ({ text, Icon }: { text: string; Icon: Icon }) => {
	const [show, setShow] = useState(false);
	const [xy, setXY] = useState({ x: 0, y: 0 });

	const openMenu = (evt: MouseEvent<HTMLButtonElement>) => {
		setShow(true);
		setXY({ x: evt.clientX, y: evt.clientY });
	};

	return (
		<>
			<motion.button
				whileTap={{ scale: 0.97 }}
				className="flex justify-between transition duration-200 hover:dark:bg-[#2b0d52] hover:bg-[#d1e0d1] text-md items-center w-full px-3 py-2 rounded-md"
			>
				<div className="flex items-center">
					<Icon size={18} className="mr-2" />
					{text}
				</div>
				<motion.button
					className="hover:dark:bg-gray-700 p-1 rounded-md"
					onClick={openMenu}
				>
					<MoreHorizontal size={18} />
				</motion.button>
			</motion.button>
			{show && (
				<div
					className="w-24 h-24 bg-white rounded-md absolute"
					style={{
						top: xy.y,
						left: xy.x,
					}}
					onClick={() => setShow(false)}
				></div>
			)}
		</>
	);
};

const Sidebar = () => {
	const { logOut } = useAuth();

	return (
		<div className="w-[260px] dark:bg-[#220845] flex flex-col gap-4 bg-[#E5FAe6] h-screen p-4">
			<motion.button
				whileTap={{ scale: 0.97 }}
				className="w-12 h-12 justify-center flex items-center rounded-full dark:bg-[#220845] hover:dark:bg-[#2b0d52]"
			>
				<Plus size={18} className="mr-2" />
			</motion.button>
			<div className="flex flex-col gap-2">
				<Item text="All" Icon={Folder} />
				<Item text="Archive" Icon={Archive} />
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="text-sm font-bold text-gray-500">Tags</h3>
				<Item text="names" Icon={Hash} />
				<Item text="number" Icon={Hash} />
				<Item text="addresses" Icon={Hash} />
			</div>
			<div className="flex flex-col gap-2">
				<Item text="Help" Icon={HelpCircle} />
				<Item text="Settings" Icon={Settings} />
				<motion.button
					whileTap={{ scale: 0.97 }}
					className="flex dark:bg-[#2b0d52] bg-[#d1e0d1] text-md items-center w-full px-3 py-2 rounded-md"
					onClick={logOut}
				>
					<LogOut size={18} className="mr-2" />
					Logout
				</motion.button>
			</div>
			<ThemeToggle />
		</div>
	);
};

export default Sidebar;
