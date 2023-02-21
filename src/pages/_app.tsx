import type { AppProps, AppType } from "next/app";
import { AnimatePresence } from "framer-motion";
import { AuthContextProvider } from "~/context";
import { ThemeProvider } from "next-themes";
import { trpc } from "~/utils/trpc";
import "../styles/global.scss";
import CpyContextProvider from "~/context/CpyContext";
import SettingsContextProvider from "~/context/SettingsContext";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<AuthContextProvider>
			<CpyContextProvider>
				<SettingsContextProvider>
					<AnimatePresence mode="sync">
						<ThemeProvider enableSystem attribute="class">
							<Component {...pageProps} />
						</ThemeProvider>
					</AnimatePresence>
				</SettingsContextProvider>
			</CpyContextProvider>
		</AuthContextProvider>
	);
};

export default trpc.withTRPC(MyApp);
