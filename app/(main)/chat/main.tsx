"use client";

import { ChatWindow } from "@/components/chat/chatWindow";

interface ChatProps {
	userId: string;
	dateString: string;
}

const Main: React.FC<ChatProps> = ({ userId, dateString }) => {
	const emptyInfoCard = <></>;

	return (
		<ChatWindow
			endpoint="api/chat"
			emoji=""
			titleText={dateString}
			placeholder="I am Ioulia, your personal AI assistant. Help may I help you today?"
			emptyStateComponent={emptyInfoCard}
		></ChatWindow>
	);
};

export default Main;
