import { useTheme } from "next-themes";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Layout, Protected } from "~/components";
import Portal from "~/components/Portal";
import SetupE2EE from "~/components/SetupE2EE";
import { useSettings } from "~/context/SettingsContext";
import E2EE from "~/lib/e2ee";

const Settings = () => {
	const { theme, setTheme } = useTheme();
	const [modal, openModal] = useState<boolean>(false);
	const [E2EEState, setE2EE] = useState<boolean>(false);
	const { settings, setSettings } = useSettings();
	const fileRef = useRef<HTMLInputElement>(null);

	const toggleTheme = (): void => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const saveKey = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const reader = new FileReader();
			reader.addEventListener("load", event => {
				E2EE.saveKeyToLocalStorage(event?.target?.result as string);
			});
			reader.readAsText(files[0]);
		}
		setE2EE(true);
	};

	const exportKey = () => {
		const file = new File(
			[E2EE.loadKeyFromLocalStorage()],
			"cpy-encryption-key.txt",
			{ type: "text/plain" }
		);
		const url = URL.createObjectURL(file);
		const a = document.createElement("a");
		a.href = url;
		a.download = "cpy-encryption-key.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	useEffect(() => {
		if (localStorage.getItem("cpy-ekey")) setE2EE(true);
	}, [localStorage.getItem("cpy-ekey")]);

	const setupHandler = () => {
		openModal(true);
	};

	return (
		<Protected>
			<Layout title="Settings">
				<div className="flex flex-col items-start w-full gap-y-4">
					<section className="w-full">
						<h2 className="text-xl font-bold">E2E encryption</h2>
						<div className="divider"></div>
						<ul className="flex flex-col gap-y-2">
							<li className="flex justify-between flex-col md:flex-row">
								<div className="flex flex-col items-start">
									<h4 className="font-semibold">
										Setup End-to-End Encryption
									</h4>
									<span className="text-sm text-gray-400">
										You can set up an encryption key and your clips
										won't even be decrypted by servers
									</span>
								</div>
								<button
									className={`p-2 w-32 my-2 ${
										E2EEState
											? "border-2 border-secondary-dark"
											: "bg-secondary-dark"
									} rounded`}
									onClick={setupHandler}
									disabled={E2EEState}
								>
									{E2EEState ? "Enabled" : "Setup"}
								</button>
							</li>
							<li className="flex justify-between flex-col md:flex-row">
								<div className="flex flex-col items-start">
									<h4 className="font-semibold">Import Private Key</h4>
									<span className="text-sm text-gray-400">
										You can import the encryption key file if you have
										a backup to restore the encrypted contents
									</span>
								</div>
								<input
									type="file"
									className="hidden"
									ref={fileRef}
									onChange={saveKey}
									accept=".txt"
								/>
								<button
									className="p-2 w-32 my-2 rounded bg-secondary-dark"
									onClick={() => fileRef.current?.click()}
								>
									Import
								</button>
							</li>
							<li className="flex justify-between flex-col md:flex-row">
								<div className="flex flex-col items-start">
									<h4 className="font-semibold">Export Private Key</h4>
									<span className="text-sm text-gray-400">
										You can export the encryption key file in case you
										change browser or loss the encryption
									</span>
								</div>
								<button
									className="p-2 w-32 my-2 rounded bg-secondary-dark"
									onClick={exportKey}
								>
									Export
								</button>
							</li>
						</ul>
					</section>
					<section className="w-full">
						<h2 className="text-xl font-bold">Others</h2>
						<div className="divider"></div>
						<ul className="flex flex-col gap-y-2">
							<li className="flex justify-between">
								<div className="flex flex-col items-start">
									<h4 className="font-semibold">Toggle Theme</h4>
									<span className="text-sm text-gray-400">
										Switch between dark and light theme
									</span>
								</div>
								<label
									htmlFor="theme-check"
									className="flex items-center cursor-pointer"
								>
									<div className="relative">
										<input
											type="checkbox"
											id="theme-check"
											className="sr-only"
											onChange={toggleTheme}
											checked={theme === "dark"}
										/>
										<div className="block bg-gray-600 w-14 h-8 rounded-full dot-bg"></div>
										<div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
									</div>
								</label>
							</li>
							<li className="flex justify-between">
								<div className="flex flex-col items-start">
									<h4 className="font-semibold">Toggle Help Page</h4>
									<span className="text-sm text-gray-400">
										Hide or Show the help page
									</span>
								</div>
								<label
									htmlFor="toggle-help"
									className="flex items-center cursor-pointer"
								>
									<div className="relative">
										<input
											type="checkbox"
											id="toggle-help"
											checked={settings.showHelp}
											onChange={() =>
												setSettings({
													...settings,
													showHelp: !settings.showHelp,
												})
											}
											className="sr-only"
										/>
										<div className="block bg-gray-600 w-14 h-8 rounded-full dot-bg"></div>
										<div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
									</div>
								</label>
							</li>
							<li className="flex justify-between">
								<div className="flex flex-col items-start">
									<h4 className="font-semibold">Toggle Archive</h4>
									<span className="text-sm text-gray-400">
										Enable or Disable the archive feature in your
										account
									</span>
								</div>
								<label
									htmlFor="toggle-archive"
									className="flex items-center cursor-pointer"
								>
									<div className="relative">
										<input
											type="checkbox"
											id="toggle-archive"
											checked={settings.showArchive}
											onChange={() =>
												setSettings({
													...settings,
													showArchive: !settings.showArchive,
												})
											}
											className="sr-only"
										/>
										<div className="block bg-gray-600 w-14 h-8 rounded-full dot-bg"></div>
										<div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
									</div>
								</label>
							</li>
						</ul>
					</section>
				</div>
				{modal && (
					<Portal show={modal} setShow={openModal}>
						<SetupE2EE />
					</Portal>
				)}
			</Layout>
		</Protected>
	);
};

export default Settings;
