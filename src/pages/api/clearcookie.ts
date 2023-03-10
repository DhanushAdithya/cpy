import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "~/lib/cookie";

const handler = (
	_: NextApiRequest,
	res: NextApiResponse<{ cleared: boolean }>
) => {
	setCookie(res, "cpy-token", "", { path: "/", maxAge: 0 });
	res.json({ cleared: true });
};

export default handler;
