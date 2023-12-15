import { auth } from "@clerk/nextjs";

import Records from "@/app/(main)/(routes)/records/records";

export default function RecordsPage() {
	const { userId } = auth();

	if (!userId) throw Error("userId undefined");

	return (
		<div className="m-5">
			<Records userId={userId} />
		</div>
	);
}
