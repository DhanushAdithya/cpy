import {
	createContext,
	ReactNode,
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
import { auth, db } from "../firebase/config";

type User = {
	uid: string;
	email: string;
	uname: string;
};

type AuthResponse = {
	error: boolean;
	message: string;
};

type AuthContextType = {
	user: User;
	signUp: (
		name: string,
		uname: string,
		email: string,
		pwd: string
	) => Promise<AuthResponse>;
	logIn: (email: string, pwd: string) => Promise<AuthResponse>;
	logOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setUser({
					uid: user.uid,
					email: user.email,
					uname: user.displayName,
				});
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const signUp = async (
		name: string,
		uname: string,
		email: string,
		pwd: string
	) => {
		try {
			const {
				user: { uid },
			} = await createUserWithEmailAndPassword(auth, email, pwd);
			await updateProfile(auth.currentUser, { displayName: uname });
			const userDoc = doc(db, "users", uid);
			await setDoc(userDoc, { email, uname, name });
			return { error: false, message: uid };
		} catch (e) {
			return { error: true, message: e.message };
		}
	};

	const logIn = async (email: string, pwd: string) => {
		try {
			const {
				user: { uid },
			} = await signInWithEmailAndPassword(auth, email, pwd);
			return { error: false, message: uid };
		} catch (e) {
			return { error: true, message: e.message };
		}
	};

	const logOut = async () => {
		setUser(null);
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
