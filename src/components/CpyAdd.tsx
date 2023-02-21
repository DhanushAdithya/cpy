import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useCpy } from "~/context/CpyContext";
import E2EE from "~/lib/e2ee";
import { trpc } from "~/utils/trpc";
import { useModal } from "./Portal";
import Toast from "./Toast";

type CpyProps = {
	name: string;
	content: string;
	date: number;
	tag: string;
	isPublic: boolean;
	expiry: number;
	isProtected: boolean;
	isArchived: boolean;
};

const CpyAdd = () => {
	const { setShow } = useModal();
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState(false);
	const [encrypt, setEncrypt] = useState<boolean>(false);
	const [form, setForm] = useState<CpyProps>({
		name: "",
		content: "",
		tag: "",
		isPublic: false,
		date: 19,
		expiry: 21,
		isProtected: false,
		isArchived: false,
	});

	const { tagsList, tagsLoading, cpysRefetch } = useCpy();
	const { mutate } = trpc.cpy.create.useMutation({
		onSuccess() {
			cpysRefetch();
			setToast(true);
			setLoading(false);
			setTimeout(() => {
				setShow(false);
				setToast(false);
			}, 2000);
		},
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		if (!form.isProtected) {
			mutate(form);
		} else {
			const encr = new E2EE(E2EE.loadKeyFromLocalStorage());
			mutate({ ...form, content: encr.encryptContent(form.content) });
		}
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<input
				name="name"
				placeholder="name"
				value={form.name}
				required
				onChange={e =>
					setForm(form => ({ ...form, [e.target.name]: e.target.value }))
				}
			/>
			<textarea
				name="content"
				placeholder="content"
				required
				value={form.content}
				onChange={e =>
					setForm(form => ({ ...form, [e.target.name]: e.target.value }))
				}
			/>
			{/*
                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={e =>
                        setForm(form => ({ ...form, [e.target.name]: e.target.value }))
                    }
                />
            */}
			<div className="flex space-x-2">
				<input
					type="radio"
					name="isPublic"
					value="public"
					checked={form.isPublic}
					onChange={e =>
						setForm(form => ({
							...form,
							[e.target.name]: e.target.checked,
						}))
					}
				/>
				<input
					type="radio"
					name="isPublic"
					value="private"
					checked={!form.isPublic}
					onChange={e =>
						setForm(form => ({
							...form,
							[e.target.name]: !e.target.checked,
						}))
					}
				/>
			</div>
			<div className="flex space-x-2">
				<input
					type={"checkbox"}
					checked={form.isProtected}
					name="isProtected"
					onChange={e =>
						setForm(form => ({
							...form,
							isProtected: !form.isProtected,
						}))
					}
					id="encrypt"
				/>
				<label htmlFor="encrypt" className="text-white">
					Encrypt this clip
				</label>
			</div>
			<select
				onChange={e => {
					console.log(e.target);
					setForm(form => ({
						...form,
						[e.target.name]: e.target.value,
					}));
				}}
				value={form.tag}
				name="tag"
			>
				<option value="">No Tag</option>
				{tagsLoading
					? null
					: tagsList?.tags.map(tag => (
							<option value={tag.name} key={tag.id}>
								{tag.name}
							</option>
					  ))}
			</select>
			{/*
                <input
                    name="expiry"
                    type="date"
                    value={form.expiry}
                    onChange={e =>
                        setForm(form => ({ ...form, [e.target.name]: e.target.value }))
                    }
                />
            */}
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
					<>Add Cpy</>
				)}
			</motion.button>
			<Toast show={toast} msg={"Cpy Added!"} />
		</form>
	);
};

export default CpyAdd;
