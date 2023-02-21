import { router, procedure } from "~/server/trpc";
import { z } from "zod";
import {
	addDoc,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { cpysCol, tagsCol, usertestCol } from "~/firebase/config";
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
			// const user = collection(usertestCol, uid, "cpy");
			// const data = await getDocs(user);
			// const cpys = data.docs
			// console.log(cpys.map(e => e.data()))
			try {
				const result = await conn.query(
					"SELECT * FROM cpys WHERE isArchived = $1 AND userid = $2",
					[input?.archive ?? false, Number(uid)]
				);
				return { cpys: result.rows };
			} catch (err) {
				return { cpys: [] };
			}
			// const cpysDoc = doc(cpysCol, uid);
			// const docSnap = await getDoc(cpysDoc);
			// if (docSnap.exists()) {
			// 	const data = docSnap.data();
			// 	if (input && input.archive) {
			// 		const archived = data.cpys.filter(cpy => cpy.isArchived);
			// 		return { cpys: archived };
			// 	}
			// 	return { cpys: data.cpys.filter(cpy => !cpy.isArchived) };
			// }
			// return { cpys: [] };
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
			// const user = collection(usertestCol, uid, "cpy");
			// await addDoc(user, input);
			const { name, content, tag, isPublic, isProtected } = input;
			const result = await conn.query(
				"INSERT INTO cpys (name, content, tags, isPublic, isProtected, userid) VALUES ($1, $2, $3, $4, $5, $6)",
				[name, content, [tag], isPublic, isProtected, Number(uid)]
			);
			console.log(result);
			const cpysDoc = doc(cpysCol, uid);
			await updateDoc(cpysDoc, {
				cpys: arrayUnion({ ...input, id: uuid(), isArchived: false }),
			});
		}),
	delete: procedure.input(z.string()).mutation(async ({ ctx, input: id }) => {
		const { uid } = ctx;
		// const user = doc(usertestCol, uid, "cpy", id);
		// await deleteDoc(user);
		const cpysDoc = doc(cpysCol, uid);
		const docSnap = await getDoc(cpysDoc);
		if (docSnap.exists()) {
			const { cpys } = docSnap.data();
			const updatedCpys = cpys.filter(cpy => cpy.id !== id);
			await updateDoc(cpysDoc, { cpys: updatedCpys });
		}
	}),
	archive: procedure.input(z.string()).mutation(async ({ ctx, input: id }) => {
		const { uid } = ctx;
		const cpysDoc = doc(cpysCol, uid);
		const docSnap = await getDoc(cpysDoc);
		if (docSnap.exists()) {
			const { cpys } = docSnap.data();
			const idx = cpys.findIndex(cpy => cpy.id === id);
			cpys[idx] = { ...cpys[idx], isArchived: true };
			await updateDoc(cpysDoc, { cpys });
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
			const tagsDoc = doc(tagsCol, uid);
			const docSnap = await getDoc(tagsDoc);
			if (docSnap.exists()) {
				const data = docSnap.data();
				return { tags: data.tags };
			}
			return { tags: [] };
		}),
	getTag: procedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { uid } = ctx;
			const cpysDoc = doc(cpysCol, uid);
			const docSnap = await getDoc(cpysDoc);
			if (docSnap.exists()) {
				const { cpys } = docSnap.data();
				const list = cpys.filter(
					cpy => cpy.tag === input.id && !cpy.isArchived
				);
				return { list };
			}
			return { list: [] };
		}),
	addTag: procedure
		.input(
			z.object({
				name: z
					.string()
					.max(12, { message: "tag name cannot exceed 12 letters" }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { uid } = ctx;
			const tagsDoc = doc(tagsCol, uid);
			await updateDoc(tagsDoc, {
				tags: arrayUnion({ ...input, id: uuid() }),
			});
		}),
	deleteTag: procedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { uid } = ctx;
			const cpysDoc = doc(cpysCol, uid);
			const docSnap = await getDoc(cpysDoc);
			if (docSnap.exists()) {
				// const { cpys } = docSnap.data();
				// const updatedCpys = cpys.filter(cpy => cpy.id !== id);
				// await updateDoc(cpysDoc, { cpys: updatedCpys });
			}
		}),
	updateTag: procedure
		.input(
			z.object({
				id: z.string(),
				name: z
					.string()
					.max(12, { message: "tag name cannot exceed 12 letters" }),
			})
		)
		.mutation(({ ctx, input }) => {}),
});
