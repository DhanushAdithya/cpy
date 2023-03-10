import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { User, LoginState, SignUpState, AuthContextType } from "~/types";
import { trpc } from "~/utils/trpc";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setAuth] = useState<boolean>(false);
	const { mutateAsync: signupMutate } = trpc.user.signup.useMutation();
	const { isLoading, isError, failureReason } = trpc.cpy.checkUser.useQuery();

	useEffect(() => {
		if (!isLoading && isError && failureReason?.data?.httpStatus === 401) {
			setAuth(false);
			setLoading(false);
		} else if (!isLoading && !isError) {
			setAuth(true);
			setLoading(false);
		} else if (isLoading) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [isLoading]);

	const signUp = async (form: SignUpState) => {
		const { name, uname, email, password } = form;
		try {
			const { error, message } = (await signupMutate({
				name,
				uname,
				email,
				password,
			})) as { error: boolean; message: string | number };
			if (!error) return { error: false, message: message as string };
			return { error, message: message as string };
		} catch (err) {
			if (err instanceof Error) {
				return { error: true, message: err.message };
			} else {
				return { error: true, message: "Unknown Error Occured" };
			}
		}
	};

	const logIn = async (form: LoginState) => {
		const { email, password } = form;
		try {
			const { error, message } = await (
				await fetch("/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				})
			).json();
			setUser(message as User);
			if (!error) {
				setAuth(true);
				return { error: false, message: "Login Successful" };
			}
			return { error, message: message as string };
		} catch (err) {
			if (err instanceof Error) return { error: true, message: err.message };
			return { error: true, message: "Unknown Error Occured" };
		}
	};

	const logOut = async () => {
		setUser(null);
		setAuth(false);
		await fetch("/api/clearcookie");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				logOut,
				logIn,
				signUp,
				isAuthenticated,
			}}
		>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
