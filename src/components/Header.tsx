import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "react-feather";
import CpyAdd from "./CpyAdd";
import Portal from "./Portal";

const Header = ({ title }: { title?: string }) => {
	const [show, setShow] = useState<boolean>(false);

	return (
		<>
			<div className="sticky top-5 z-30">
				<div className="flex justify-between">
					<h1 className="text-3xl m-0 p-0 font-dmserif">
						{title ?? "All"}
					</h1>
					<motion.button
						whileTap={{ scale: 0.9 }}
						className="w-10 h-10 flex items-center dark:bg-secondary-dark shadow-lg justify-center bg-gray-300 rounded-full"
						onClick={() => setShow(!show)}
					>
						<Plus />
					</motion.button>
				</div>
				<hr className="border-0 my-4 mt-3 h-0.5 dark:bg-white bg-black w-full" />
			</div>
			{show && (
				<Portal show={show} setShow={setShow}>
					<CpyAdd />
				</Portal>
			)}
		</>
	);
};

export default Header;
