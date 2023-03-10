import { router, procedure } from "~/server/trpc";
import { z } from "zod";
import conn from "~/lib/pgpool";

export const cpyRouter = router({
	list: procedure
		.input(
			z
				.object({
					count: z.number().optional(),
					tag: z.string().optional(),
					archive: z.boolean().optional(),
				})
				.optional()
		)
		.query(async ({ ctx, input }) => {
			const { uid } = ctx;
			try {
				const result = await conn.query(
					"SELECT * FROM cpys WHERE isArchived = $1 AND userid = $2",
					[input?.archive ?? false, uid]
				);
				return { cpys: result.rows };
			} catch (err) {
				return { cpys: [] };
			}
		}),
	create: procedure
		.input(
			z.object({
				name: z.string(),
				content: z.string(),
				date: z.number(),
				tag: z.string(),
				isPublic: z.boolean(),
				isProtected: z.boolean(),
				isArchived: z.boolean(),
				expiry: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { uid } = ctx;
			const { name, content, tag, isPublic, isProtected } = input;
			const result = await conn.query(
				"INSERT INTO cpys (name, content, tags, isPublic, isProtected, userid) VALUES ($1, $2, $3, $4, $5, $6)",
				[name, content, [tag], isPublic, isProtected, Number(uid)]
			);
			console.log(result);
		}),
	update: procedure
		.input(
			z.object({
				id: z.number(),
				name: z.string(),
				content: z.string(),
				isPublic: z.boolean(),
				isProtected: z.boolean(),
				tag: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id, name, content, isPublic, isProtected, tag } = input;
			await conn.query(
				"UPDATE cpys SET name = $2, content = $3, ispublic = $4, isprotected = $5, tags = $6 WHERE id = $1",
				[id, name, content, isPublic, isProtected, [tag]]
			);
		}),
	delete: procedure.input(z.number()).mutation(async ({ ctx, input: id }) => {
		try {
			await conn.query("DELETE FROM cpys WHERE id = $1", [id]);
			return { error: false };
		} catch (err) {
			return { error: true };
		}
	}),
	archive: procedure.input(z.number()).mutation(async ({ ctx, input: id }) => {
		try {
			await conn.query(
				"UPDATE cpys SET isArchived = NOT isArchived WHERE id = $1",
				[id]
			);
			return { error: false };
		} catch (err) {
			return { error: true };
		}
	}),
	listTags: procedure
		.input(
			z
				.object({
					count: z.number().optional(),
				})
				.optional()
		)
		.query(async ({ ctx, input }) => {
			const { uid } = ctx;
			const { rows } = await conn.query(
				"SELECT tags FROM users WHERE id = $1",
				[uid]
			);
			return {
				tags: !rows.length
					? []
					: // @ts-ignore
					  rows[0].tags.reduce((acc, val) => {
							acc.push({
								name: val,
								id: Math.floor(Math.random() * 100),
							});
							return acc;
					  }, []),
			};
		}),
	getTag: procedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { uid } = ctx;
			try {
				const { rows } = await conn.query(
					"SELECT * FROM cpys WHERE $2 = ANY(tags) AND userid = $1 AND isArchived = FALSE",
					[uid, input.name]
				);
				return { list: rows };
			} catch (err) {
				if (err instanceof Error) return { list: [] };
				return { list: true };
			}
		}),
	addTag: procedure
		.input(
			z.object({
				name: z.string().optional(),
				tagName: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { uid } = ctx;
			await conn.query(
				"UPDATE users SET tags = array_append(tags, $2) WHERE id = $1",
				[uid, input.tagName]
			);
		}),
	deleteTag: procedure
		.input(z.string())
		.mutation(async ({ ctx, input: tag }) => {
			const { uid } = ctx;
			await conn.query(
				"UPDATE users SET tags = array_remove(tags, $2) WHERE id = $1",
				[uid, tag]
			);
			await conn.query(
				"UPDATE cpys SET tags = array[''] WHERE userid = $1 AND $2 = ANY(tags)",
				[uid, tag]
			);
		}),
	updateTag: procedure
		.input(
			z.object({
				name: z.string().optional(),
				tagName: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { uid } = ctx;
			await conn.query(
				"UPDATE users SET tags = array_replace(tags, $2, $3) WHERE id = $1",
				[uid, input.name, input.tagName]
			);
			await conn.query(
				"UPDATE cpys SET tags = array_replace(tags, $2, $3) WHERE userid = $1 AND $2 = ANY(tags)",
				[uid, input.name, input.tagName]
			);
		}),
	cpysWithUsername: procedure
		.input(
			z.object({
				uname: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { uname } = input;
			try {
				const { rows } = await conn.query(
					"SELECT * FROM cpys WHERE userid = (SELECT id FROM users WHERE uname = $1) AND ispublic = 't' AND isarchived = 'f'",
					[uname]
				);
				console.log(rows);
				return { cpys: rows };
			} catch (err) {
				return { cpys: true };
			}
		}),
	checkUser: procedure.query(async () => {
		return { isAuthenticated: true };
	}),
});
