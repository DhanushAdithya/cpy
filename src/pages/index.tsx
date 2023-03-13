import type { NextPage } from "next";
import Link from "next/link";
import { Nav, Footer, ThemeToggle } from "~/components";
import HomeLayout from "~/components/HomeLayout";

const Index: NextPage = () => {
	return (
		<HomeLayout>
			<div
				className="font-display text-font-light flex flex-col items-center min-h-screen justify-between dark:text-font-dark"
				id="home"
			>
				<Nav />
				<section className="flex flex-col landing-section max-w-2xl md:space-y-12 space-y-8 items-center">
					<h1 className="text-5xl md:text-6xl text-center tracking-wider flex leading-tight justify-center flex-col items-center">
						Your Clipboard,
						<span className="bg-gradient-to-r cursor-pointer hover:bg-gradient-to-l ease-in duration-300 font-sans tracking-normal font-black from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
							elevated.
						</span>
					</h1>
					<p className="text-xl md:text-2xl font-sans dark:text-[#969696] px-2 md:px-0 text-center">
						revolutionize your clipboard management with advanced
						features. sync, customize, and more.
					</p>
					<div className="flex gap-x-6">
						{/*
                            <Link
                                className="select-none text-2xl rounded-full p-2 px-8 border-2"
                                href="/features"
                            >
                                features
                            </Link>
                        */}
						<Link
							className="select-none bg-white text-black rounded-full text-xl p-2 pb-3 md:text-2xl px-8 border-2 hover:scale-105 transition"
							href="/signup"
						>
							get started
						</Link>
					</div>
				</section>
				<ThemeToggle />
				<Footer />
			</div>
		</HomeLayout>
	);
};

export default Index;
