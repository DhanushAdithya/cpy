import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";

type setting = {
	showHelp: boolean;
	showArchive: boolean;
};

type SettingsContextType = {
	settings: setting;
	setSettings: Dispatch<SetStateAction<setting>>;
};

const SettingsContext = createContext<SettingsContextType>(
	{} as SettingsContextType
);

export const useSettings = () => useContext(SettingsContext);

const SettingsContextProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<{
		showHelp: boolean;
		showArchive: boolean;
	}>({
		showHelp: true,
		showArchive: true,
	});
	const [second, setSecond] = useState<boolean>(false);

	useEffect(() => {
		if (localStorage.getItem("cpy-settings")) {
			setSettings(JSON.parse(localStorage.getItem("cpy-settings")!));
		}
	}, []);

	useEffect(() => {
		if (second)
			localStorage.setItem("cpy-settings", JSON.stringify(settings));
		setSecond(true);
	}, [settings]);

	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};

export default SettingsContextProvider;
