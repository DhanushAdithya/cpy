import { createContext, ReactNode, useContext, useState } from "react";
import { CpyContextType } from "~/types";
import { trpc } from "~/utils/trpc";

const CpyContext = createContext<CpyContextType>({
	tagsList: { tags: [] },
	cpysList: { cpys: [] },
	cpysLoading: false,
	tagsLoading: false,
	cpysRefetch: () => {},
	tagsRefetch: () => {},
	setQuery: () => {},
});

export const useCpy = () => useContext(CpyContext);

const CpyContextProvider = ({ children }: { children: ReactNode }) => {
	const [query, setQuery] = useState<{
		tag?: string;
		count?: number;
		archive?: boolean;
	}>({
		archive: false,
	});

	const cpys = trpc.cpy.list.useQuery(query, {
		refetchOnWindowFocus: false,
	});

	const tags = trpc.cpy.listTags.useQuery(query, {
		refetchOnWindowFocus: false,
	});

	const value = {
		tagsList: tags.data as CpyContextType["tagsList"],
		cpysList: cpys.data as CpyContextType["cpysList"],
		cpysLoading: cpys.isLoading,
		tagsLoading: tags.isLoading,
		cpysRefetch: cpys.refetch,
		tagsRefetch: tags.refetch,
		setQuery,
	};

	return <CpyContext.Provider value={value}>{children}</CpyContext.Provider>;
};

export default CpyContextProvider;
