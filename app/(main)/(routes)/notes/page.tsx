import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import SubHeadBar from "./sub-headbar";

export default async function NotesPage() {
	const { userId } = auth();

	if (!userId) throw Error("userId undefined");

	const allNotes = await prisma.note.findMany({
		where: {
			userId: userId,
		},
	});

	return (
		<div>
			<SubHeadBar />
			<div>{JSON.stringify(allNotes)}</div>
		</div>
	);
}
