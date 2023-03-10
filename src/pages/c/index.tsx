import type { NextPage } from "next";
import Layout from "~/components/Layout";
import CpyCard from "~/components/CpyCard";
import { AnimatePresence } from "framer-motion";
import { trpc } from "~/utils/trpc";

const CpyIndex: NextPage = () => {
	const { data, isLoading } = trpc.cpy.list.useQuery({ archive: false });

	return (
		<Layout>
			<AnimatePresence>
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
			</AnimatePresence>
		</Layout>
	);
};

export default CpyIndex;
