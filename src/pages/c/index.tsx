import { Protected } from "~/components";
import type { NextPage } from "next";
import Layout from "~/components/Layout";
import CpyCard from "~/components/CpyCard";
import { useEffect } from "react";
import { useCpy } from "~/context/CpyContext";
import { AnimatePresence } from "framer-motion";

const CpyIndex: NextPage = () => {
	const { cpysList, cpysRefetch, cpysLoading, setQuery } = useCpy();

	useEffect(() => {
		// cpysRefetch();
		setQuery(q => ({ ...q, archive: false }));
	}, []);

	if (!cpysLoading) {
		console.log(cpysList);
	}

	return (
		<Protected>
			<Layout>
				<AnimatePresence>
					{cpysLoading
						? null
						: cpysList.cpys.map(tag => (
								<CpyCard
									name={tag.name}
									content={tag.content}
									id={tag.id}
									key={tag.id}
									isProtected={tag.isProtected}
								/>
						  ))}
				</AnimatePresence>
			</Layout>
		</Protected>
	);
};

export default CpyIndex;
