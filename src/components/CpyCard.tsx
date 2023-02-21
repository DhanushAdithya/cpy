import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Archive, MoreHorizontal, Trash, X } from "react-feather";
import { useCpy } from "~/context/CpyContext";
import E2EE from "~/lib/e2ee";
import { trpc } from "~/utils/trpc";

const CpyCard = ({
	name,
	content,
	id,
	isProtected,
}: {
	name: string;
	content: string;
	id: string;
	isProtected: boolean;
}) => {
	const [toggle, setToggle] = useState(false);
	const [copyIndicator, setCopyIndicator] = useState(false);
	const variants = {
		move: { x: -125 },
		none: { x: 0 },
		show: { opacity: 1 },
		hide: { opacity: 0 },
	};
	const copyContent = () => {
		if (!isProtected) {
			navigator.clipboard.writeText(content);
		} else {
			const decr = new E2EE(E2EE.loadKeyFromLocalStorage());
			navigator.clipboard.writeText(decr.decryptContent(content));
		}
		setCopyIndicator(true);
		setTimeout(() => setCopyIndicator(false), 1000);
	};
	const { cpysRefetch } = useCpy();
	const { mutate } = trpc.cpy.delete.useMutation({
		onSuccess() {
			cpysRefetch();
		},
	});
	const { mutate: archiveMutate } = trpc.cpy.archive.useMutation({
		onSuccess() {
			cpysRefetch();
		},
	});

	const deleteCpy = () => {
		mutate(id);
	};

	const archiveCpy = () => {
		archiveMutate(id);
	};

	const card_variant = {
		hide: { y: "-50%", opacity: 0, transition: { duration: 0.3 } },
		show: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
	};

	return (
		<motion.div
			variants={card_variant}
			initial="hide"
			exit="hide"
			animate="show"
			className="relative mt-2 w-[700px] transition"
		>
			<motion.details
				variants={variants}
				animate={toggle ? "move" : "none"}
				className="w-full p-3 z-30 dark:bg-[#210A3F] bg-gray-300 rounded-md"
			>
				<motion.summary className="flex items-center justify-between cursor-pointer">
					<div className="flex items-center">
						<button
							className={`w-20 p-2 transition rounded ${
								copyIndicator
									? "bg-green-600"
									: "bg-gray-400 dark:bg-[#2B0D52]"
							}`}
							onClick={copyContent}
						>
							{copyIndicator ? "copied" : "copy"}
						</button>
						<div className="ml-3 select-none text-lg font-bold">
							{name}
						</div>
					</div>
					<div>
						<button
							className="px-6 p-2 rounded bg-gray-400 dark:bg-[#2B0D52] select-none"
							onClick={() => setToggle(!toggle)}
						>
							{toggle ? (
								<X className="pointer-events-none" />
							) : (
								<MoreHorizontal className="pointer-events-none" />
							)}
						</button>
					</div>
				</motion.summary>
				<div>
					<hr className="border-0 h-0 w-full my-0 dark:bg-white bg-black" />
					<div className="dark:bg-[#391666] bg-gray-400 rounded mt-3 p-3 text-sm">
						{content}
					</div>
				</div>
			</motion.details>
			<motion.div
				variants={variants}
				animate={toggle ? "show" : "hide"}
				className={`${
					!toggle ? "hidden" : ""
				} transition absolute right-0 top-0 h-full flex justify-center items-center rounded-l-md`}
			>
				<motion.button
					className="px-5 transition cursor-pointer h-full hover:bg-yellow-600 bg-yellow-500"
					whileTap={{ scale: 0.95 }}
					onClick={archiveCpy}
				>
					<Archive />
				</motion.button>
				<motion.button
					onClick={deleteCpy}
					className="px-5 transition cursor-pointer rounded-r-md h-full hover:bg-red-600 bg-red-500"
					whileTap={{ scale: 0.95 }}
				>
					<Trash />
				</motion.button>
			</motion.div>
		</motion.div>
	);
};

export default CpyCard;
