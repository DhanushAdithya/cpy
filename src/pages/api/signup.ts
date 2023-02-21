import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "~/lib/pgpool";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ id: any } | { message: string; err: Error }>
) {
	const { name, email, uname, password } = req.body;
	try {
		const hash = await bcrypt.hash(password, 10);
		const user = await pool.query(
			"INSERT INTO users (name, email, uname, password) VALUES ($1, $2, $3, $4) RETURNING id",
			[name, email, uname, hash]
		);
		return res.status(201).json({ id: user.rows[0].id });
	} catch (err) {
		if (err instanceof Error) {
			return res.status(500).json({
				message: err.message,
				err,
			});
		}
	}
}
