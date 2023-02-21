import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
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

	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};

export default SettingsContextProvider;
