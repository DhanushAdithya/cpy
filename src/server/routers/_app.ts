import { cpyRouter } from "./cpy.router";
import { userRouter } from "./user.router";
import { router } from "../trpc";

export const appRouter = router({
	user: userRouter,
	cpy: cpyRouter,
});

export type AppRouter = typeof appRouter;
