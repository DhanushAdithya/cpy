import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	CollectionReference,
	DocumentData,
	getFirestore,
} from "firebase/firestore";
import {
	CpyColType,
	SettingsColType,
	TagColType,
	UserColType,
	UserType,
} from "~/types";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>;
};

export const usertestCol = createCollection<UserType>("usertest");
export const usersCol = createCollection<UserColType>("users");
export const cpysCol = createCollection<CpyColType>("cpys");
export const settingsCol = createCollection<SettingsColType>("settings");
export const tagsCol = createCollection<TagColType>("tags");
