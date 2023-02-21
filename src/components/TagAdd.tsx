import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useCpy } from "~/context/CpyContext";
import { trpc } from "~/utils/trpc";
import Toast from "./Toast";

const TagAdd = () => {
	const [loading, setLoading] = useState(false);
	const [showToast, setToast] = useState(false);
	const [form, setForm] = useState({
		name: "",
	});
	const { mutate } = trpc.cpy.addTag.useMutation();

	const { tagsRefetch } = useCpy();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		mutate(form, {
			onSuccess() {
				tagsRefetch();
				setToast(true);
				setTimeout(() => {
					setToast(false);
				}, 2000);
				setLoading(false);
			},
		});
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Tag Name"
				name="name"
				value={form.name}
				minLength={1}
				maxLength={12}
				pattern="[A-z0-9_-]{1,12}"
				className="invalid:border-red-900 border-2 outline-none border-transparent"
				onChange={e =>
					setForm({ ...form, [e.target.name]: e.target.value })
				}
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
						Adding ...
					</>
				) : (
					<>Add Tag</>
				)}
			</motion.button>
			<Toast show={showToast} msg={"Tag Added!"} />
		</form>
	);
};

export default TagAdd;
