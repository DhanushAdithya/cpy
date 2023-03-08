import type { NextPage } from "next";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Nav, L, ThemeToggle } from "~/components";
import { useAuth } from "~/context";
import { useRouter } from "next/router";

const Login: NextPage = () => {
	const { user, logIn } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (user) router.push("/c");
	}, []);

	const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setLoading(true);

		const { error, message } = await logIn(form);
		if (!error) {
			localStorage.setItem("cpy-token", message);
			router.push("/c");
		}
		setLoading(false);
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
				<h1 className="text-3xl font-bold dark:text-light text-center text-dark">
					Login
				</h1>
				<form className="primary-form" onSubmit={onSubmit}>
					<input
						name="email"
						type="email"
						placeholder="Enter email"
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
						className={`${
							loading ? "bg-gray-300" : ""
						} p-2 px-9 border-2 text-lg text-white flex items-center justify-center hover:bg-white hover:text-black ease-in duration-100 font-bold`}
						disabled={loading}
					>
						{loading && (
							<div className="border-4 border-t-black w-4 h-4 border-transparent rounded-full animate-spin mr-4"></div>
						)}
						Log In
					</button>
				</form>
				<ThemeToggle />
			</L>
		</>
	);
};

export default Login;
