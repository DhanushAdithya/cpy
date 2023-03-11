import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "~/lib/pgpool";
import jwt from "jsonwebtoken";
import { setCookie } from "~/lib/cookie";
import { User } from "~/types";

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

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ error: boolean; message: string | User }>
) {
	const { email, password } = req.body;
	try {
		const result = await pool.query(
			"SELECT id, password, uname, name, email FROM users WHERE email = $1",
			[email]
		);
		if (result.rows.length) {
			const user = result.rows[0];
			const passMatch = await bcrypt.compare(password, user.password);
			if (!passMatch) {
				res.json({ error: true, message: "Wrong Password" });
				return;
			}
			const { token, error } = signJWT(user.id);
			if (error) {
				res.json({ error: true, message: error });
				return;
			}
			setCookie(res, "cpy-token", token, {
				path: "/",
				maxAge: 86400,
				httpOnly: true,
			});
			res.json({
				error: false,
				message: {
					uname: user.uname,
					name: user.name,
					email: user.email,
				},
			});
			return;
		}
		res.json({ error: true, message: "No User Found" });
	} catch (err) {
		if (err instanceof Error) res.json({ error: true, message: err.message });
		res.json({ error: true, message: "Unknown Error Occured" });
	}
}
