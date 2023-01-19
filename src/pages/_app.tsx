import type { AppProps, AppType } from "next/app";
import { AnimatePresence } from "framer-motion";
import { AuthContextProvider } from "~/context";
import { ThemeProvider } from "next-themes";
import { trpc } from "~/utils/trpc";
import "../styles/global.scss";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<AuthContextProvider>
			<AnimatePresence mode="wait" initial={false}>
				<ThemeProvider enableSystem attribute="class">
					<Component {...pageProps} />
				</ThemeProvider>
			</AnimatePresence>
		</AuthContextProvider>
	);
};

export default trpc.withTRPC(MyApp);
