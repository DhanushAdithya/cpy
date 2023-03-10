import { motion } from "framer-motion";
import { useState } from "react";
import {
	Archive,
	Edit,
	ExternalLink,
	Eye,
	EyeOff,
	MoreHorizontal,
	Trash,
	X,
} from "react-feather";
import E2EE from "~/lib/e2ee";
import { trpc } from "~/utils/trpc";
import CpyEdit from "./CpyEdit";
import Portal from "./Portal";

const CpyCard = ({
	name,
	content,
	id,
	isProtected,
	isArchived,
	tag,
	isPublic,
	others = false,
}: {
	name: string;
	content: string;
	id: number;
	isProtected: boolean;
	isArchived: boolean;
	tag: string;
	isPublic: boolean;
	others?: boolean;
}) => {
	const [toggle, setToggle] = useState(false);
	const [copyIndicator, setCopyIndicator] = useState(false);
	const [cpyContent, setCpyContent] = useState<string>(content);
	const [hide, setHide] = useState<boolean>(true);
	const [show, setShow] = useState<boolean>(false);
	const variants = {
		move: { x: -188 },
		none: { x: 0 },
		show: { opacity: 1 },
		hide: { opacity: 0 },
	};
	const copyContent = () => {
		if (!isProtected || others) {
			navigator.clipboard.writeText(content);
		} else {
			const decr = new E2EE(E2EE.loadKeyFromLocalStorage());
			navigator.clipboard.writeText(decr.decryptContent(content));
		}
		setCopyIndicator(true);
		setTimeout(() => setCopyIndicator(false), 1000);
	};

	const { refetch } = trpc.cpy.list.useQuery({ archive: isArchived });
	const { mutate } = trpc.cpy.delete.useMutation({
		onSuccess() {
			refetch();
		},
	});
	const { mutate: archiveMutate } = trpc.cpy.archive.useMutation({
		onSuccess() {
			refetch();
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

	const showDecrypted = () => {
		if (hide) {
			setHide(false);
			const decr = new E2EE(E2EE.loadKeyFromLocalStorage());
			setCpyContent(decr.decryptContent(content));
		} else {
			setHide(true);
			setCpyContent(content);
		}
	};

	return (
		<>
			<motion.div
				variants={card_variant}
				initial="hide"
				exit="hide"
				animate="show"
				className="relative mt-2 w-full transition"
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
						{!others && (
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
						)}
					</motion.summary>
					<div>
						<div className="dark:bg-[#391666] bg-gray-400 rounded mt-3 p-3 text-sm">
							{cpyContent}
						</div>
					</div>
					{!others && isProtected && (
						<div className="flex w-full justify-end mt-3">
							<motion.button
								onClick={showDecrypted}
								whileTap={{ scale: 0.95 }}
								className="p-3 dark:bg-[#391666] bg-gray-400 rounded"
							>
								{hide ? <Eye /> : <EyeOff />}
							</motion.button>
						</div>
					)}
				</motion.details>
				{!others && (
					<motion.div
						variants={variants}
						animate={toggle ? "show" : "hide"}
						className={`${
							!toggle ? "hidden" : ""
						} transition absolute right-0 top-0 h-full flex justify-center items-center rounded-l-md`}
					>
						<motion.button
							onClick={() => setShow(true)}
							className="px-5 transition cursor-pointer h-full hover:bg-blue-600 bg-blue-500"
							whileTap={{ scale: 0.95 }}
						>
							<Edit />
						</motion.button>
						<motion.button
							className="px-5 transition cursor-pointer h-full hover:bg-yellow-600 bg-yellow-500"
							whileTap={{ scale: 0.95 }}
							onClick={archiveCpy}
						>
							{!isArchived ? <Archive /> : <ExternalLink />}
						</motion.button>
						<motion.button
							onClick={deleteCpy}
							className="px-5 transition cursor-pointer rounded-r-md h-full hover:bg-red-600 bg-red-500"
							whileTap={{ scale: 0.95 }}
						>
							<Trash />
						</motion.button>
					</motion.div>
				)}
			</motion.div>
			{show && (
				<Portal show={show} setShow={setShow}>
					<CpyEdit
						id={id}
						isProtected={isProtected}
						isPublic={isPublic}
						content={content}
						name={name}
						tag={tag}
					/>
				</Portal>
			)}
		</>
	);
};

export default CpyCard;
