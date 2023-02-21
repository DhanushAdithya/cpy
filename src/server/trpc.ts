import { initTRPC, TRPCError, type inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = async (opts: CreateNextContextOptions) => {
	const uid = opts.req.headers["x-uid"] as string;
	return { uid };
};

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const authMiddleware = t.middleware(async ({ ctx, next }) => {
	if (!ctx.uid) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({ ctx });
});

export const router = t.router;
export const procedure = t.procedure.use(authMiddleware);
export const userProcedure = t.procedure;
