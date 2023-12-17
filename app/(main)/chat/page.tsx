import { auth } from "@clerk/nextjs";

import Main from "@/app/(main)/chat/main";

export default function ChatPage() {
	const { userId } = auth();

	if (!userId) throw Error("userId undefined");

	return (
		<div>
			<Main userId={userId} />
		</div>
	);
}
