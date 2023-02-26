import { createContext, ReactNode, useContext, useState } from "react";
import { trpc } from "~/utils/trpc";

const CpyContext = createContext({});

export const useCpy = () => useContext(CpyContext);

const CpyContextProvider = ({ children }: { children: ReactNode }) => {
	const [query, setQuery] = useState<{
		tag?: string;
		count?: number;
		archive?: boolean;
	}>({
		archive: false,
	});

	const [cpysList, setCpysList] = useState({ cpys: [] });
	const [tagsList, setTagsList] = useState({ tags: [] });

	const cpys = trpc.cpy.list.useQuery(query, {
		refetchOnWindowFocus: false,
	});

	const tags = trpc.cpy.listTags.useQuery(query, {
		refetchOnWindowFocus: false,
	});

	const value = {
		tagsList: tags.data,
		cpysList: cpys.data,
		cpysLoading: cpys.isLoading,
		tagsLoading: tags.isLoading,
		cpysRefetch: cpys.refetch,
		tagsRefetch: tags.refetch,
		setQuery,
	};

	return <CpyContext.Provider value={value}>{children}</CpyContext.Provider>;
};

export default CpyContextProvider;
