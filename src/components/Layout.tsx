import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "~/context";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

type Props = {
	title?: string;
	children?: React.ReactNode;
};

const Layout = (props: Props) => {
	const { isAuthenticated, logOut } = useAuth();
	const router = useRouter();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		if (!isAuthenticated) logOut().then(() => router.push("/login"));
		setMounted(true);
	}, [isAuthenticated]);

	if (!isAuthenticated || !mounted) return <div>Loading...</div>;

	return (
		<div className="flex">
			<Sidebar />
			<div className="p-5 grow mb-16 md:mb-0 min-h-screen">
				<Header title={props.title} />
				{props.children}
			</div>
			<ThemeToggle />
		</div>
	);
};

export default Layout;
