import { useAuth } from "~/context";
import Link from "next/link";

type Props = {
	form?: boolean;
};

const Nav = (props: Props) => {
	const { isAuthenticated } = useAuth();
	return (
		<nav
			className={`font-dmserif dark:text-white flex ${
				props.form ? "justify-center md:" : ""
			}justify-between landing-nav items-center`}
		>
			<h1 className={`text-5xl ${props.form ? "mb-5" : ""} md:mt-[-2px]`}>
				<Link href="/">cpy</Link>
			</h1>
			{!props.form && (
				<ul className="flex gap-4">
					{/*
                        <li className="text-xl">
                            <Link href="/features">features</Link>
                        </li>
                    */}
					{isAuthenticated ? (
						<li className="text-xl">
							<Link href="/c">your cpys</Link>
						</li>
					) : (
						<>
							<li className="text-xl">
								<Link href="/login">login</Link>
							</li>
							<li className="text-xl">
								<Link href="/signup">signup</Link>
							</li>
						</>
					)}
				</ul>
			)}
		</nav>
	);
};

export default Nav;
