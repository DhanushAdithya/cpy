import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { useSettings } from "~/context/SettingsContext";
import { trpc } from "~/utils/trpc";
import Portal from "./Portal";
import SidebarItem from "./SidebarItem";
import TagAdd from "./TagAdd";

const Sidebar = () => {
	const { logOut } = useAuth();
	const { settings } = useSettings();
	const router = useRouter();
	const [show, setShow] = useState<boolean>(false);
	const { data, isLoading } = trpc.cpy.listTags.useQuery();

	return (
		<div className="cpy-sidebar">
			<div>
				<Link href="/c">
					<h1 className="hidden md:flex items-center justify-center pb-1 text-2xl font-bold rounded-md text-black dark:text-white font-display text-center h-12 dark:bg-[#2b0d52] bg-[#d1e0d1]">
						cpy
					</h1>
				</Link>
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
				<div className="flex md:justify-between px-2 text-sm font-bold text-gray-500">
					<h3 className="hidden tags-text md:block">Tags</h3>
					<button onClick={() => setShow(!show)}>
						<Plus size={14} />
					</button>
				</div>
				{isLoading
					? null
					: // @ts-ignore
					  data?.tags.map(tag => (
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
						onClick={e => {
							e.preventDefault();
							logOut().then(() => router.push("/login"));
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
