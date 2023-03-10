import { appRouter } from "~/server/routers/_app";

export type UserColType = {
	email: string;
	uname: string;
	name: string;
};

export type CpyContextType = {
	tagsList: TagColType;
	cpysList: CpyColType;
	cpysLoading: boolean;
	tagsLoading: boolean;
	cpysRefetch: Function;
	tagsRefetch: Function;
	setQuery: Function;
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
		id: number;
		name: string;
	}[];
};

export type CpyColType = {
	cpys: {
		id: number;
		name: string;
		content: string;
		ispublic: boolean;
		tag: string;
		isprotected: boolean;
		expiry: string;
		date: string;
		isarchived: boolean;
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
	isAuthenticated: boolean;
	signUp: (form: SignUpState) => Promise<AuthResponse>;
	logIn: (form: LoginState) => Promise<AuthResponse>;
	logOut: () => Promise<void>;
};

export type AppRouter = typeof appRouter;
