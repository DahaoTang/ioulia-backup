import { Heading2 } from "@/components/headings";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
	// const { userId } = auth();

	// if (userId) redirect("/chat");

	return (
		<div
			className="w-full h-full flex items-center justify-center 
		bg-gradient-to-br from-neutral-50 from-10% via-neutral-300 via-50% to-neutral-50 to-90% 
		dark:bg-gradient-to-br dark:from-neutral-950 dark:from-10% dark:via-neutral-700 dark:via-50% dark:to-neutral-950 dark:to-90%"
		>
			<Heading2
				className="animate-horizontal-expand p-10 
			bg-gradient-to-r from-sky-500 from-10% via-fuchsia-500 via-30% to-rose-500 to-90% 
			dark:from-sky-300 dark:from-10% dark:via-fuchsia-300 dark:via-30% dark:to-rose-400 dark:to-90% 
			inline-block text-transparent bg-clip-text"
			>
				Your personal AI assistant close as a friend
			</Heading2>
		</div>
	);
}
