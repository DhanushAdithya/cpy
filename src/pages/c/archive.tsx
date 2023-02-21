import { Protected } from "~/components";
import type { NextPage } from "next";
import Layout from "~/components/Layout";
import CpyCard from "~/components/CpyCard";
import { useEffect } from "react";
import { useCpy } from "~/context/CpyContext";

const CpyArchive: NextPage = () => {
	const { cpysList, cpysRefetch, cpysLoading, setQuery } = useCpy();

	useEffect(() => {
		setQuery(q => ({ ...q, archive: true }));
	}, []);

	return (
		<Protected>
			<Layout title="Archive">
				{cpysLoading
					? null
					: cpysList.cpys.map(tag => (
							<CpyCard
								name={tag.name}
								content={tag.content}
								id={tag.id}
								key={tag.id}
							/>
					  ))}
			</Layout>
		</Protected>
	);
};

export default CpyArchive;
