import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {
	auth,
	cpysCol,
	db,
	settingsCol,
	tagsCol,
	usersCol,
	usertestCol,
} from "../firebase/config";
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
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user && user.email && user.displayName) {
				setUser({
					uid: user.uid,
					email: user.email,
					uname: user.displayName,
					name: "",
				});
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const signUp = async (form: SignUpState) => {
		const { name, uname, email, password } = form;
		try {
			const { message } = await signupMutate({
				name,
				uname,
				email,
				password,
			});
			// const {
			// 	user: { uid },
			// } = await createUserWithEmailAndPassword(auth, email, password);
			// if (!auth.currentUser) throw Error("no user signed in");
			// await updateProfile(auth.currentUser, { displayName: uname });
			// const userTestDoc = doc(usertestCol, uid);
			// const usersDoc = doc(usersCol, uid);
			// const cpysDoc = doc(cpysCol, uid);
			// const settingsDoc = doc(settingsCol, uid);
			// const tagsDoc = doc(tagsCol, uid);
			// await setDoc(userTestDoc, {
			// 	email,
			// 	uname,
			// 	name,
			// 	settings: {
			// 		theme: "dark",
			// 		isKeySet: false,
			// 		showHelp: true,
			// 		showArchive: true,
			// 	},
			// });
			// await setDoc(usersDoc, { email, uname, name });
			// await setDoc(cpysDoc, { cpys: [] });
			// await setDoc(settingsDoc, { theme: "dark" });
			// await setDoc(tagsDoc, { tags: [] });
			setUser({ uid: message, uname, email, name });
			localStorage.setItem("cpy-uid", JSON.stringify(message));
			return { error: false, message };
			// return { error: false, message: uid };
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
		const { message } = await loginMutate({ email, password });
		console.log(message);
		// try {
		// 	const {
		// 		user: { uid },
		// 	} = await signInWithEmailAndPassword(auth, email, password);
		return { error: false, message: message as string };
		// } catch (err) {
		// 	if (err instanceof Error) {
		// 		return { error: true, message: err.message };
		// 	} else {
		// 		return { error: true, message: "unknown error occured" };
		// 	}
		// }
	};

	const logOut = async () => {
		setUser(null);
		localStorage.removeItem("cpy-uid");
		await signOut(auth);
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
