import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { auth } from "~/firebase/config";
import type { AppRouter } from "~/types";

function getBaseUrl() {
	if (typeof window !== "undefined") return "";

	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

	if (process.env.RENDER_INTERNAL_HOSTNAME)
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: opts =>
						process.env.NODE_ENV === "development" ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
					headers() {
						const uid = localStorage.getItem("cpy-uid") || "";
						// const uid = auth.currentUser?.uid || "";
						return { "x-uid": uid };
					},
				}),
			],
			queryClientConfig: {
				defaultOptions: {
					queries: {
						staleTime: 60,
					},
				},
			},
		};
	},
	ssr: false,
});
