import { Protected } from "@components";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Layout from "../../components/Layout";

const CpyIndex: NextPage = () => {
	const [toggle, setToggle] = useState(false);
	const variants = {
		move: {
			x: 100,
		},
		none: {
			x: 0,
		},
	};
	return (
		<Protected>
			<Layout>
				<div>
					<motion.div
						animate={toggle ? "move" : "none"}
						variants={variants}
						className="w-96 flex items-center rounded-md p-2 bg-gray-700 cursor-pointer"
					>
						<motion.button
							className="p-4 bg-gray-600 rounded-md transition hover:bg-gray-800"
							onClick={() => setToggle(toggle => !toggle)}
						>
							<MoreHorizontal size={18} />
						</motion.button>
					</motion.div>
				</div>
			</Layout>
		</Protected>
	);
};

export default CpyIndex;
