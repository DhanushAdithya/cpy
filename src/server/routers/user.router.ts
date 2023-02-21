import { router, userProcedure } from "~/server/trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conn from "~/lib/pgpool";

const signJWT = (email: string) => {
	const expiresIn = Number(process.env.EXPIRES_IN) || 24 * 60 * 60;
	try {
		const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
			expiresIn,
			issuer: process.env.JWT_ISSUER,
		});
		return { error: null, token };
	} catch (err) {
		if (err instanceof Error) {
			return { error: err.message, token: null };
		} else {
			return { error: "Unknown Error", token: null };
		}
	}
};

export const userRouter = router({
	login: userProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().min(8),
			})
		)
		.mutation(async ({ input }) => {
			const { email, password } = input;
			try {
				const result = await conn.query(
					"SELECT * FROM users WHERE email = $1",
					[email]
				);
				if (result.rows.length) {
					const user = result.rows[0];
					const passMatch = await bcrypt.compare(password, user.password);
					if (!passMatch) {
						return { error: true, message: "Wrong Password" };
					}
					const { token, error } = signJWT(email);
					if (error) {
						return { error: true, message: error };
					}
					console.log(token);
					return { error: false, message: token };
				}
				return { error: true, message: "No User Found" };
			} catch (err) {
				if (err instanceof Error)
					return { error: true, message: err.message };
				return { error: true, message: "Unknown Error Occured" };
			}
		}),
	signup: userProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().min(8),
				uname: z.string().max(30),
				name: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { name, email, uname, password } = input;
			try {
				const hash = await bcrypt.hash(password, 10);
				const user = await conn.query(
					"INSERT INTO users (name, email, uname, password) VALUES ($1, $2, $3, $4) RETURNING id",
					[name, email, uname, hash]
				);
				console.log(user);
				return { error: false, message: user.rows[0].id };
			} catch (err) {
				if (err instanceof Error)
					return { message: err.message, error: true };
				return { error: true, message: "Unknown Error Occured" };
			}
		}),
	info: userProcedure.query(() => {}),
	settings: userProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(({ input }) => {}),
});
