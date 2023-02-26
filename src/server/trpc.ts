import { initTRPC, TRPCError, type inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import jwt from "jsonwebtoken";

export const createContext = async (opts: CreateNextContextOptions) => {
	const token = opts.req.headers["x-token"] as string;
	return { token };
};

export const verifyJWT = (token: string) => {
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
		if (decodedToken) return { message: decodedToken, error: false };
		return { error: true, message: "Unauthorized" };
	} catch (err) {
		if (err instanceof Error) return { message: err.message, error: true };
		return { error: true, message: "Unknown Error Occured" };
	}
};

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const authMiddleware = t.middleware(async ({ ctx, next }) => {
	if (!ctx.token) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
    const { message, error } = verifyJWT(ctx.token);
    if (error) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
    }
	return next({ ctx: message } as { ctx: {
        token: string;
        uid: number;
        iss: string;
        iat: number;
        exp: number;
    } });
});

export const router = t.router;
export const procedure = t.procedure.use(authMiddleware);
export const userProcedure = t.procedure;
