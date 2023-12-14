import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import SubHeadBar from "@/app/(main)/(routes)/records/subheadbar";

export default async function RecordsPage() {
	const { userId } = auth();

	if (!userId) throw Error("userId undefined");

	const allRecords = await prisma.record.findMany({
		where: {
			userId: userId,
		},
	});

	return (
		<div className="m-5">
			<SubHeadBar userId={userId} />
			<div>{JSON.stringify(allRecords)}</div>
		</div>
	);
}
