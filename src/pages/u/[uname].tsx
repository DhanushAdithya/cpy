import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Header } from "~/components";
import CpyCard from "~/components/CpyCard";
import { trpc } from "~/utils/trpc";

const Username = () => {
	const { uname } = useRouter().query;
	const { data, isLoading } = trpc.cpy.cpysWithUsername.useQuery({
		uname: (uname as string) || "",
	});

	return (
		<div className="p-6">
			<Header title={uname as string} />
			<AnimatePresence>
				{isLoading
					? null
					: data &&
					  // @ts-ignore
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
								others={true}
							/>
					  ))}
			</AnimatePresence>
		</div>
	);
};

export default Username;
