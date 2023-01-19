import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Nav, ThemeToggle } from "~/components";
import { useAuth } from "~/context";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
	const { user, signUp } = useAuth();
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		uname: "",
	});

	useEffect(() => {
		if (user) router.push("/c");
	}, []);

	const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const { error, message } = await signUp(
			form.name,
			form.uname,
			form.email,
			form.password
		);
		if (error) console.log(message);
		router.push("/c");
	};

	const updateField = (evt: ChangeEvent<HTMLInputElement>): void => {
		setForm({
			...form,
			[evt.target.name]: evt.target.value,
		});
	};

	return (
		<>
			<Nav form />
			<form className="primary-form" onSubmit={onSubmit}>
				<input
					type="name"
					name="name"
					placeholder="Name"
					value={form.name}
					onChange={updateField}
				/>
				<input
					type="name"
					name="uname"
					placeholder="Username"
					value={form.uname}
					onChange={updateField}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={updateField}
				/>
				<input
					type="password"
					name="password"
					placeholder="*****"
					value={form.password}
					onChange={updateField}
				/>
				<button
					type="submit"
					className="p-2 px-9 border-2 text-lg text-white hover:bg-white hover:text-black ease-in duration-100 font-bold"
				>
					Sign Up
				</button>
				<ThemeToggle />
			</form>
		</>
	);
};

export default Signup;
