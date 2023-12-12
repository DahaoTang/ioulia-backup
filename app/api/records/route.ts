import prisma from "@/lib/db/prisma";
import { createRecordSchema } from "@/lib/validation/record";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();

		const parseResult = createRecordSchema.safeParse(body);
		if (!parseResult.success) {
			console.error(parseResult.error);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { title, content } = parseResult.data;

		const note = await prisma.record.create({
			data: {
				title: title,
				content: content ?? "",
				userId: userId,
			},
		});
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
