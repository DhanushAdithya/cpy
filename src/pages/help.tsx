import { useRouter } from "next/router";
import { ChevronLeft } from "react-feather";
import { ThemeToggle } from "~/components";

const Help = () => {
	const router = useRouter();
	return (
		<div className="w-full flex justify-center my-4 p-3">
			<div className="w-[700px]">
				<div className="flex justify-between w-full">
					<h1 className="text-3xl m-0 p-0 font-dmserif flex w-full justify-between">
						<span>Help</span>
						<button
							className="dark:bg-secondary-dark flex items-center bg-secondary rounded p-2"
							onClick={() => router.back()}
						>
							<ChevronLeft size={14} className="mr-1" />
							<span className="text-sm font-sans mr-2">Back</span>
						</button>
					</h1>
				</div>
				<hr className="border-0 my-4 mt-3 h-0.5 dark:bg-white bg-black w-full" />
				<div className="flex flex-col gap-y-6">
					<p className="text-lg text-neutral-400">
						Here's a list of features available in our clipboard manager,
						and how to use them.
					</p>
					<div>
						<h3 className="text-2xl font-bold">
							Add New Clipboard Contents
						</h3>
						<div className="divider"></div>
						<p className="text-lg text-neutral-400">
							To add a new clipboard content, simply click on the "Add
							New" button. You can then paste the content you want to
							store, and add a tag if you wish.
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold">Tag Clipboard Contents</h3>
						<div className="divider"></div>
						<p className="text-lg text-neutral-400">
							You can tag your clipboard contents to make them easier to
							find later. To tag a content, click on the "Tag" button,
							and enter your desired tag.
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold">Encryption</h3>
						<div className="divider"></div>
						<p className="text-lg text-neutral-400">
							To setup end-to-end encryption, head to the "Settings" page
							and follow the instructions to generate an encryption key.
							You can import or export the key at any time.
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold">
							Archive Clipboard Contents
						</h3>
						<div className="divider"></div>
						<p className="text-lg text-neutral-400">
							You can archive your clipboard contents to keep them, but
							remove them from the main view. This feature can be enabled
							or disabled in the "Settings" page.
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold">
							Delete Clipboard Contents
						</h3>
						<div className="divider"></div>
						<p className="text-lg text-neutral-400">
							To delete a clipboard content, click on the "Delete" button
							next to the content you want to remove.
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold">Toggle Themes</h3>
						<div className="divider"></div>
						<p className="text-lg text-neutral-400">
							You can toggle between light and dark themes by going to
							the "Settings" page or clicking on the "Toggle Themes"
							button in the bottom right corner.
						</p>
					</div>
				</div>
			</div>
			<ThemeToggle />
		</div>
	);
};

export default Help;
