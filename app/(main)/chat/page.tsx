import { auth } from "@clerk/nextjs";

import Main from "@/app/(main)/chat/main";

export default function ChatPage() {
	const { userId } = auth();

	if (!userId) throw Error("userId undefined");

	const now = new Date();
	const dateString = now.toLocaleDateString(); // e.g., '12/17/2023'

	return (
		<div>
			<Main userId={userId} dateString={dateString}/>
		</div>
	);
}
