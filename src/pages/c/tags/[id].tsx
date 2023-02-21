import { useRouter } from "next/router";
import { Layout } from "~/components";
import CpyCard from "~/components/CpyCard";
import { trpc } from "~/utils/trpc";

const Tag = () => {
	const { query } = useRouter();
	const { id } = query as { id: string };
	const { data, isLoading } = trpc.cpy.getTag.useQuery({ id });

	return (
		<Layout title={id}>
			{isLoading
				? null
				: data?.list.map(cpy => (
						<CpyCard
							id={cpy.id}
							name={cpy.name}
							key={cpy.id}
							content={cpy.content}
						/>
				  ))}
		</Layout>
	);
};

export default Tag;
