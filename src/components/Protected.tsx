import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "~/context";

export default ({ children }: { children: ReactNode }) => {
	const { user } = useAuth();
	const router = useRouter();

	console.log(router.pathname);

	useEffect(() => {
		if (!user) router.push("/login");
	}, [router, user]);

	return <>{user && children}</>;
};
