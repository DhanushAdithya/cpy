import type { NextPage } from "next";
import Layout from "~/components/Layout";
import CpyCard from "~/components/CpyCard";
import { trpc } from "~/utils/trpc";

const CpyArchive: NextPage = () => {
	const { data, isLoading } = trpc.cpy.list.useQuery({ archive: true });

	return (
		<Layout title="Archive">
			{isLoading
				? null
				: data &&
				  data.cpys.map(cpy => (
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
	);
};

export default CpyArchive;
