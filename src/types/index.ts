import { appRouter } from "~/server/routers/_app";

export type UserColType = {
	email: string;
	uname: string;
	name: string;
};

export type CpyType = {
	name: string;
	content: string;
	isProtected: boolean;
	isPublic: boolean;
	isArchived: boolean;
	date: string;
	count: number;
	tags: string[];
	expiry: string;
};

export type SettingsType = {
	theme: "dark" | "light";
	isKeySet: boolean;
	showArchive: boolean;
	showHelp: boolean;
};

export interface UserType {
	email: string;
	uname: string;
	name: string;
	cpys?: CpyType[];
	tags?: string[];
	settings: SettingsType;
}

export type TagColType = {
	tags: {
		id: string;
		name: string;
	}[];
};

export type CpyColType = {
	cpys: {
		id: string;
		name: string;
		content: string;
		isPublic: boolean;
		tag: string;
		isProtected: boolean;
		expiry: string;
		date: string;
		isArchived: boolean;
	}[];
};

export type SettingsColType = {
	theme: "dark" | "light";
};

export type LoginState = {
	email: string;
	password: string;
};

export type SignUpState = {
	name: string;
	uname: string;
} & LoginState;

export type User = {
	// uid: string;
	uid: number;
	email: string;
	uname: string;
	name: string;
} | null;

export type AuthResponse = {
	error: boolean;
	message: string;
};

export type AuthContextType = {
	user: User;
	signUp: (form: SignUpState) => Promise<AuthResponse>;
	logIn: (form: LoginState) => Promise<AuthResponse>;
	logOut: () => Promise<void>;
};

export type AppRouter = typeof appRouter;
