import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "~/lib/pgpool";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ id: any } | { message: string }>
) {
	const { email, password } = req.body;
	try {
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		if (!user.rows.length) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		const passMatch = await bcrypt.compare(password, user.rows[0].password);
		if (!passMatch) {
			return res.status(401).json({
				message: "Wrong Password",
			});
		}
		// const { token, error } = signJWT(user);
		// if (error) {
		// 	return res.status(500).json({
		// 		message: error,
		// 	});
		// }
		// return res.status(200).json({ token, user });
	} catch (err) {
		if (err instanceof Error) {
			return res.status(500).json({
				message: err.message,
				// err,
			});
		}
	}
}
