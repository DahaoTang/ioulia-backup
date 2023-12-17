"use client";

import { ChatWindow } from "@/components/chat/chatWindow";

interface ChatProps {
	userId: string;
}

const Main: React.FC<ChatProps> = ({ userId }) => {
	const emptyInfoCard = <></>;

	return (
		<ChatWindow
			endpoint="api/chat"
			emoji="🏴‍☠️"
			titleText="Patchy the Chatty Pirate"
			placeholder="I'm an LLM pretending to be a pirate! Ask me about the pirate life!"
			emptyStateComponent={emptyInfoCard}
		></ChatWindow>
	);
};

export default Main;
