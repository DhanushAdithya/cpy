import type { NextPage } from "next";
import Link from "next/link";
import { Nav, Footer, ThemeToggle } from "~/components";
import HomeLayout from "~/components/HomeLayout";

const Index: NextPage = () => {
	return (
		<HomeLayout>
			<div
				className="font-display text-font-light flex flex-col min-h-screen justify-between dark:text-font-dark"
				id="home"
			>
				<Nav />
				<section className="flex flex-col landing-section space-y-12 items-center">
					<h1 className="text-6xl w-[650px] tracking-wider flex leading-tight justify-center flex-col items-center">
						Your Clipboard,
						<span className="bg-gradient-to-r cursor-pointer hover:bg-gradient-to-l ease-in duration-300 font-sans tracking-normal font-black from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
							elevated.
						</span>
					</h1>
					<p className="text-2xl font-sans w-[650px] dark:text-[#969696] text-center">
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
							className="select-none bg-white text-black rounded-full text-2xl p-2 px-8 border-2 hover:scale-105 transition"
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
