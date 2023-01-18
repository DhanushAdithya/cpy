const Header = ({ type }) => {
	return (
		<div className="">
			<h1 className="text-3xl m-0 font-dmserif">{type ?? "All"}</h1>
			<hr className="border-0 my-4 mt-3 h-0.5 bg-white" />
		</div>
	);
};

export default Header;
