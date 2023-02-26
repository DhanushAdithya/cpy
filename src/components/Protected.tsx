import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem("cpy-token")?.length) router.push("/login");
	}, []);

	return <>{localStorage.getItem("cpy-token")?.length && children}</>;
};
