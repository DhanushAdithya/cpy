import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "~/components";

const Cpy: NextPage = () => {
	const router = useRouter();
	const { type } = router.query;

	return (
		<Layout type={type as string}>
			<p>Type: {type}</p>
		</Layout>
	);
};

export default Cpy;
