import type { NextPage } from "next";
import Link from "next/link";
import { Nav, Footer, ThemeToggle } from "@components";
import { motion } from "framer-motion";

const Index: NextPage = () => {
	return (
		<motion.div className="font-dmserif flex flex-col h-screen justify-between dark:text-white">
			<Nav />
			<section className="flex flex-col landing-section space-y-12 items-center">
				<h1 className="text-6xl w-[650px] tracking-wider flex leading-tight justify-center flex-col items-center">
					Your Clipboard,
					<span className="bg-gradient-to-r cursor-pointer hover:bg-gradient-to-l ease-in duration-300 font-sans tracking-normal font-black from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
						elevated.
					</span>
				</h1>
				<p className="text-2xl font-sans w-[650px] dark:text-[#969696] text-center">
					revolutionize your clipboard management with advanced features.
					sync, customize, and more.
				</p>
				<Link
					className="select-none text-2xl p-3 px-8 border-2 hover:scale-105 ease-in duration-75"
					href="/signup"
				>
					get started
				</Link>
			</section>
			<ThemeToggle />
			<Footer />
		</motion.div>
	);
};

export default Index;
