import { z } from "zod";

export const createRecordSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Title is required" })
		.max(26, { message: "The word limit is 26." }),
	content: z.string().optional(),
});

// export type CreateRecordSchema = z.infer<typeof createRecordSchema>;

export const getRecordSchema = z.object({
	id: z.string().min(1),
	query: z.string(),
});

export const updateRecordSchema = createRecordSchema.extend({
	id: z.string().min(1),
});

export const deleteRecordSchema = z.object({
	id: z.string().min(1),
});
