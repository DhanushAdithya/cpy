import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	_: NextApiRequest,
	res: NextApiResponse<{ message: string; status: number }>
) {
	res.status(200).json({
		message: "naisu",
		status: 200,
	});
}
