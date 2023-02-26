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
	const { mutateAsync: signupMutate } = trpc.user.signup.useMutation();
	const { mutateAsync: loginMutate } = trpc.user.login.useMutation();

	useEffect(() => {
        setLoading(false);
	}, []);

	const signUp = async (form: SignUpState) => {
		const { name, uname, email, password } = form;
		try {
			const { error, message } = await signupMutate({
				name,
				uname,
				email,
				password,
			}) as { error: boolean; message: string | number };
			setUser({ uid: message as number, uname, email, name });
            if (!error) return { error: false, message: message as string };
            return { error, message: message as string };
		} catch (err) {
			if (err instanceof Error) {
				return { error: true, message: err.message };
			} else {
				return { error: true, message: "unknown error occured" };
			}
		}
	};

	const logIn = async (form: LoginState) => {
		const { email, password } = form;
        try {
            const { error, message } = await loginMutate({ email, password });
            return { error, message: message as string };
        } catch (err) {
            if (err instanceof Error) 
                return { error: true, message: err.message };
            return { error: true, message: "Unknown Error Occured" };
        }
	};

	const logOut = async () => {
		setUser(null);
		localStorage.removeItem("cpy-token");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				logOut,
				logIn,
				signUp,
			}}
		>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
