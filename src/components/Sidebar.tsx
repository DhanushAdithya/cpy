import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	Archive,
	Folder,
	Hash,
	HelpCircle,
	Settings,
	LogOut,
	Plus,
} from "react-feather";
import { useAuth } from "~/context";
import { useCpy } from "~/context/CpyContext";
import { useSettings } from "~/context/SettingsContext";
import Portal from "./Portal";
import SidebarItem from "./SidebarItem";
import TagAdd from "./TagAdd";

const Sidebar = () => {
	const { logOut } = useAuth();
	const { settings } = useSettings();
	const router = useRouter();
	const [show, setShow] = useState<boolean>(false);
	const { tagsList, tagsLoading } = useCpy();

	return (
		<div className="cpy-sidebar">
			<div>
				<h1 className="text-3xl text-center hidden md:block font-display">
					cpy
				</h1>
			</div>
			<div className="flex md:flex-col gap-px">
				<Link href="/c">
					<SidebarItem text="All" Icon={Folder} />
				</Link>
				{settings.showArchive && (
					<Link href="/c/archive">
						<SidebarItem text="Archive" Icon={Archive} />
					</Link>
				)}
			</div>
			<div className="flex md:flex-col gap-px">
				<div className="flex md:justify-center px-2 text-sm font-bold text-gray-500">
					<h3 className="hidden md:block">Tags</h3>
					<button onClick={() => setShow(!show)}>
						<Plus size={14} />
					</button>
				</div>
				{tagsLoading
					? null
					: tagsList?.tags.map(tag => (
							<Link href={`/c/tags/${tag.name}`} key={tag.id}>
								<SidebarItem text={tag.name} Icon={Hash} />
							</Link>
					  ))}
			</div>
			<div className="flex md:flex-col gap-px">
				{settings.showHelp && (
					<Link href="/help">
						<SidebarItem text="Help" Icon={HelpCircle} />
					</Link>
				)}
				<Link href="/settings">
					<SidebarItem text="Settings" Icon={Settings} />
				</Link>
				<Link href="#">
					<SidebarItem
						text="Logout"
						Icon={LogOut}
						onClick={() => {
							logOut();
							router.push("/login");
						}}
					/>
				</Link>
			</div>
			{show && (
				<Portal show={show} setShow={setShow}>
					<TagAdd />
				</Portal>
			)}
		</div>
	);
};

export default Sidebar;
