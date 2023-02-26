import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { Edit, Plus, Trash2 } from "react-feather";
import { trpc } from "~/utils/trpc";
import CpyAdd from "./CpyAdd";
import Portal from "./Portal";
import TagAdd from "./TagAdd";

const Header = ({ title }: { title?: string }) => {
	const [show, setShow] = useState<boolean>(false);
	const [tagShow, setTagShow] = useState<boolean>(false);
	const router = useRouter();
	const { mutate } = trpc.cpy.deleteTag.useMutation();

	return (
		<>
			<div className="sticky top-5 z-30 dark:bg-dark bg-light">
				<div className="flex justify-between">
					<h1 className="text-3xl m-0 p-0 font-dmserif">
						{title ?? "All"}
					</h1>
					<div className="flex space-x-3">
						{router.pathname.includes("/tags") && (
							<>
								<motion.button
									whileTap={{ scale: 0.9 }}
									className="w-10 h-10 flex items-center dark:bg-secondary-dark shadow-lg justify-center bg-gray-300 rounded-full"
									onClick={() => setTagShow(!tagShow)}
								>
									<Edit />
								</motion.button>
								<motion.button
									whileTap={{ scale: 0.9 }}
									className="w-10 h-10 flex items-center dark:bg-secondary-dark shadow-lg justify-center bg-gray-300 rounded-full"
									onClick={() => mutate(title as string)}
								>
									<Trash2 />
								</motion.button>
							</>
						)}
						<motion.button
							whileTap={{ scale: 0.9 }}
							className="w-10 h-10 flex items-center dark:bg-secondary-dark shadow-lg justify-center bg-gray-300 rounded-full"
							onClick={() => setShow(!show)}
						>
							<Plus />
						</motion.button>
					</div>
				</div>
				<hr className="border-0 my-4 mt-3 h-0.5 dark:bg-white bg-black w-full" />
			</div>
			{show && (
				<Portal show={show} setShow={setShow}>
					<CpyAdd />
				</Portal>
			)}
			{tagShow && (
				<Portal show={tagShow} setShow={setTagShow}>
					<TagAdd update name={title} />
				</Portal>
			)}
		</>
	);
};

export default Header;
