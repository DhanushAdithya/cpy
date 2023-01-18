import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { AuthContextProvider } from "../context/AuthContext";
import { ThemeProvider } from "next-themes";
import "../styles/global.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<AnimatePresence mode="wait" initial={false}>
				<ThemeProvider enableSystem attribute="class">
					<Component {...pageProps} />
				</ThemeProvider>
			</AnimatePresence>
		</AuthContextProvider>
	);
}
