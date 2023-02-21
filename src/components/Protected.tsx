import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "~/context";

export default ({ children }: { children: ReactNode }) => {
	// const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// if (!user) router.push("/login");
		if (!localStorage.getItem("cpy-token")) router.push("/login");
	}, []);
	// [router, user]);

	return <>{localStorage.getItem("cpy-token") && children}</>;
};
