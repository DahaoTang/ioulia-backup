import { auth } from "@clerk/nextjs";

import Main from "@/app/(main)/(routes)/records/main";

export default function RecordsPage() {
	const { userId } = auth();

	if (!userId) throw Error("userId undefined");

	return (
		<div className="m-5">
			<Main userId={userId} />
		</div>
	);
}
