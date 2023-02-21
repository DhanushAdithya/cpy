import Header from "./Header";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

type Props = {
	title?: string;
	children?: React.ReactNode;
};

const Layout = (props: Props) => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="p-5 grow min-h-screen">
				<Header title={props.title} />
				{props.children}
			</div>
			<ThemeToggle />
		</div>
	);
};

export default Layout;
