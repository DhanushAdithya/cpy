import { Protected } from "~/components";
import type { NextPage } from "next";
import Layout from "~/components/Layout";
import CpyCard from "~/components/CpyCard";
import { useEffect } from "react";
import { useCpy } from "~/context/CpyContext";

const CpyArchive: NextPage = () => {
	const { cpysList, cpysRefetch, cpysLoading, setQuery } = useCpy();

	useEffect(() => {
		cpysRefetch();
		// @ts-ignore
		setQuery(q => ({ ...q, archive: true }));
	}, []);

	return (
		<Protected>
			<Layout title="Archive">
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
								// @ts-ignore
								tag={cpy.tags[0]}
							/>
					  ))}
			</Layout>
		</Protected>
	);
};

export default CpyArchive;
