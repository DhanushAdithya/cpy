import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { trpc } from "~/utils/trpc";
import Toast from "./Toast";

type TagProps = {
	name?: string;
	update?: boolean;
};

const TagAdd = ({ name, update = false }: TagProps) => {
	const [loading, setLoading] = useState(false);
	const [showToast, setToast] = useState(false);
	const [tagName, setTagName] = useState(name ?? "");
	const { mutate } = update
		? trpc.cpy.updateTag.useMutation()
		: trpc.cpy.addTag.useMutation();

	const { refetch } = trpc.cpy.listTags.useQuery();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		mutate(
			{ name, tagName },
			{
				onSuccess() {
					refetch();
					setToast(true);
					setTimeout(() => {
						setToast(false);
					}, 2000);
					setLoading(false);
				},
			}
		);
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Tag Name"
				name="name"
				value={tagName}
				minLength={1}
				maxLength={12}
				pattern="[A-z0-9_-]{1,12}"
				className="invalid:border-re-900 border-2 outline-none border-transparent"
				onChange={e => setTagName(e.target.value)}
			/>
			<motion.button
				whileTap={{ scale: 0.95 }}
				className="flex justify-center items-center"
				type="submit"
				disabled={loading}
			>
				{loading ? (
					<>
						<div className="w-4 h-4 animate-spin border-4 border-t-white rounded-full border-transparent mr-4"></div>
						<>{update ? "Updating ..." : "Adding ..."}</>
					</>
				) : (
					<>{update ? "Update Tag" : "Add Tag"}</>
				)}
			</motion.button>
			<Toast show={showToast} msg={"Tag Added!"} />
		</form>
	);
};

export default TagAdd;
