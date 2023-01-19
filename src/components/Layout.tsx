import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
	type?: string;
	children: React.ReactNode;
};

const Layout = (props: Props) => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="p-8 grow">
				<Header type={props.type} />
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
