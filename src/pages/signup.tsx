import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Nav, ThemeToggle } from "~/components";
import { useAuth } from "~/context";
import { useRouter } from "next/router";
import HomeLayout from "~/components/HomeLayout";

const Signup: NextPage = () => {
	const { signUp } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		uname: "",
	});

	useEffect(() => {
		if (localStorage.getItem("cpy-token")) router.push("/c");
	}, []);

	const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const { error, message } = await signUp(form);
		if (error) {
			console.log(message);
			setLoading(false);
		} else {
			setLoading(false);
			router.push("/login");
		}
	};

	const updateField = (evt: ChangeEvent<HTMLInputElement>): void => {
		setForm({
			...form,
			[evt.target.name]: evt.target.value,
		});
	};

	return (
		<HomeLayout>
			<Nav form />
			<h1 className="text-3xl font-bold dark:text-light text-center text-dark">
				Sign Up
			</h1>
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
					className={`${
						loading ? "bg-gray-300" : ""
					} p-2 px-9 border-2 text-lg text-white flex items-center justify-center hover:bg-white hover:text-black ease-in duration-100 font-bold`}
					disabled={loading}
				>
					{loading && (
						<div className="border-4 border-t-black w-4 h-4 border-transparent rounded-full animate-spin mr-4"></div>
					)}
					Sign Up
				</button>
			</form>
			<ThemeToggle />
		</HomeLayout>
	);
};

export default Signup;
