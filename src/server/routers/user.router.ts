import { router, userProcedure, verifyJWT } from "~/server/trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conn from "~/lib/pgpool";

const signJWT = (uid: number) => {
	const expiresIn = Number(process.env.EXPIRES_IN) || 24 * 60 * 60;
	try {
		const token = jwt.sign({ uid }, process.env.JWT_SECRET!, {
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
					"SELECT id, password FROM users WHERE email = $1",
					[email]
				);
				if (result.rows.length) {
					const user = result.rows[0];
					const passMatch = await bcrypt.compare(password, user.password);
					if (!passMatch)
						return { error: true, message: "Wrong Password" };
					const { token, error } = signJWT(user.id);
					if (error) return { error: true, message: error };
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
				const { rows } = await conn.query(
					"INSERT INTO users (name, email, uname, password, tags) VALUES ($1, $2, $3, $4, $5) RETURNING id",
					[name, email, uname, hash, []]
				);
				return { error: false, message: rows[0].id };
			} catch (err) {
				if (err instanceof Error)
					return { message: err.message, error: true };
				return { error: true, message: "Unknown Error Occured" };
			}
		}),
	info: userProcedure.query(() => {}),
	settings: userProcedure.input(z.string()).mutation(async ({ input }) => {
		const { message, error } = verifyJWT(input) as {
			message: { uid: string };
			error: boolean;
		};
		if (!error) {
			const uid = message.uid;
			try {
				await conn.query(
					"UPDATE users SET encryptionSetup = true WHERE id = $1",
					[uid]
				);
				return { error: false, message: "Updated settings" };
			} catch (err) {
				if (err instanceof Error)
					return { message: err.message, error: true };
				return { error: true, message: "Unknown Error Occured" };
			}
		}
	}),
});
