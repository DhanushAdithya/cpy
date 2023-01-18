import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Nav, L, ThemeToggle } from "@components";
import { useAuth } from "@context";
import { useRouter } from "next/router";

const Login: NextPage = () => {
	const { user, logIn } = useAuth();
	const router = useRouter();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (user) router.push("/c");
	}, []);

	const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const { error, message } = await logIn(form.email, form.password);
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
			<L>
				<form className="primary-form" onSubmit={onSubmit}>
					<input
						name="email"
						type="email"
						placeholder="johndoe@example.com"
						value={form.email}
						onChange={updateField}
					/>
					<input
						name="password"
						type="password"
						placeholder="********"
						value={form.password}
						onChange={updateField}
					/>
					<button
						type="submit"
						className="p-2 px-9 border-2 text-lg text-white hover:bg-white hover:text-black ease-in duration-100 font-bold"
					>
						Log In
					</button>
				</form>
				<ThemeToggle />
			</L>
		</>
	);
};

export default Login;
