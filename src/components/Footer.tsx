import Link from "next/link";

const Footer = () => {
	return (
		<footer className="font-dmserif mr-auto dark:text-white flex justify-between p-8 items-center">
			<ul className="flex gap-4">
				<li className="text-xl">
					<Link href="/login">chrome</Link>
				</li>
				<li className="text-xl">
					<Link href="/login">firefox</Link>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
