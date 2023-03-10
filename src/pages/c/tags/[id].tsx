import { useRouter } from "next/router";
import { Layout } from "~/components";
import CpyCard from "~/components/CpyCard";
import { trpc } from "~/utils/trpc";

const Tag = () => {
	const router = useRouter();
	const { id } = router.query as { id: string };

	const { data, isLoading } = trpc.cpy.getTag.useQuery({ name: id });
	const { data: tagsList, isLoading: tagsLoading } =
		trpc.cpy.listTags.useQuery();

	if (tagsLoading) return null;

	// @ts-ignore
	if (!tagsLoading && !tagsList.tags.map(tag => tag.name).includes(id)) {
		router.push("/c");
	}

	return (
		<Layout title={id}>
			{isLoading
				? null
				: data &&
				  // @ts-ignore
				  data.list.map(cpy => (
						<CpyCard
							id={cpy.id}
							name={cpy.name}
							key={cpy.id}
							content={cpy.content}
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

export default Tag;
