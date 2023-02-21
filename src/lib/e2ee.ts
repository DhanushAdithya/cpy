import { AES, enc, lib, PBKDF2 } from "crypto-js";

export default class E2EE {
	private readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

	public encryptContent(content: string): string {
		const encryptedContent = AES.encrypt(content, this.key);
		return encryptedContent.toString();
	}

	public decryptContent(content: string): string {
		const decryptedContent = AES.decrypt(content, this.key);
		return decryptedContent.toString(enc.Utf8);
	}

	public static saveKeyToLocalStorage(key: string): void {
		localStorage.setItem("cpy-ekey", key);
	}

	public static loadKeyFromLocalStorage(): string {
		const key = localStorage.getItem("cpy-ekey") as string;
		return key;
	}

	public static generateKeyFromPassword(userPassword: string): string {
		const salt = E2EE.generateSalt();
		const key = PBKDF2(userPassword, salt, {
			keySize: 256 / 32,
			iterations: 10000,
		});
		return key.toString();
	}

	private static generateSalt(): string {
		return lib.WordArray.random(128 / 8).toString();
	}
}
