import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import E2EE from "~/lib/e2ee";

const SetupE2EE = () => {
	const [pass, setPass] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const genKey = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const key = E2EE.generateKeyFromPassword(pass);
		E2EE.saveKeyToLocalStorage(key);
		setLoading(true);
	};

	return (
		<form onSubmit={genKey} className="form">
			<input
				type="text"
				placeholder="Enter passcode for encryption key"
				value={pass}
				onChange={e => setPass(e.target.value)}
			/>
			<motion.button
				whileTap={{ scale: 0.95 }}
				className={`flex justify-center items-center`}
				type="submit"
				disabled={loading}
			>
				{loading ? "Encryption Set!" : "Setup"}
			</motion.button>
		</form>
	);
};

export default SetupE2EE;
