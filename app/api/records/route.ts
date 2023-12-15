import prisma from "@/lib/db/prisma";
import {
	createRecordSchema,
	getRecordSchema,
	deleteRecordSchema,
	updateRecordSchema,
} from "@/lib/validation/record";
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

		const record = await prisma.record.create({
			data: {
				title: title,
				content: content ?? "",
				userId: userId,
			},
		});
		return Response.json({ success: true, record }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const body = await req.json();

		const parseResult = getRecordSchema.safeParse(body);
		if (!parseResult.success) {
			console.error(parseResult.error);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { id, query } = parseResult.data;

		const records = await prisma.record.findMany({
			where: {
				userId: id,
				OR: [
					{
						title: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						content: {
							contains: query,
							mode: "insensitive",
						},
					},
				],
			},
		});

		if (!records) {
			return Response.json({ error: "Records not found" }, { status: 404 });
		}

		const { userId } = auth();
		if (!userId || userId != records[0].userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		return Response.json({ success: true, records }, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function PUT(req: Request) {
	try {
		const body = await req.json();

		const parseResult = updateRecordSchema.safeParse(body);
		if (!parseResult.success) {
			console.error(parseResult.error);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { id, title, content } = parseResult.data;

		const record = await prisma.record.findUnique({
			where: { id },
		});

		if (!record) {
			return Response.json({ error: "Record not found" }, { status: 404 });
		}

		const { userId } = auth();
		if (!userId || userId != record.userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const updatedRecord = await prisma.record.update({
			where: {
				id,
			},
			data: {
				title: title,
				content: content,
			},
		});

		return Response.json({ success: true, updatedRecord }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const body = await req.json();

		const parseResult = deleteRecordSchema.safeParse(body);
		if (!parseResult.success) {
			console.error(parseResult.error);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { id } = parseResult.data;

		const record = await prisma.record.findUnique({
			where: { id },
		});

		if (!record) {
			return Response.json({ error: "Record not found" }, { status: 404 });
		}

		const { userId } = auth();
		if (!userId || userId != record.userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.record.delete({
			where: {
				id,
			},
		});

		return Response.json({ message: "Record deleted" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
