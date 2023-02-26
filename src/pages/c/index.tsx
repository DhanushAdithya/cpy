import { Protected } from "~/components";
import type { NextPage } from "next";
import Layout from "~/components/Layout";
import CpyCard from "~/components/CpyCard";
import { useEffect, useState } from "react";
import { useCpy } from "~/context/CpyContext";
import { AnimatePresence } from "framer-motion";

const CpyIndex: NextPage = () => {
	const { cpysList, cpysRefetch, cpysLoading, setQuery } = useCpy();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		cpysRefetch();
		setQuery(q => ({ ...q, archive: false }));
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Protected>
			<Layout>
				<AnimatePresence>
					{cpysLoading
						? null
						: cpysList &&
						  cpysList.cpys.map(cpy => (
								<CpyCard
									name={cpy.name}
									content={cpy.content}
									id={cpy.id}
									key={cpy.id}
									isProtected={cpy.isprotected}
									isArchived={cpy.isarchived}
									isPublic={cpy.ispublic}
									tag={cpy.tags[0]}
								/>
						  ))}
				</AnimatePresence>
			</Layout>
		</Protected>
	);
};

export default CpyIndex;
