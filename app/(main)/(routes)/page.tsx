"use client";

import { Heading2 } from "@/components/headings";

export default function Home() {
	return (
		<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-200 from-10% via-neutral-400 via-50% to-neutral-200 to-90% dark:bg-gradient-to-br dark:from-neutral-950 dark:from-10% dark:via-neutral-700 dark:via-50% dark:to-neutral-950 dark:to-90%">
		<Heading2 className="bg-gradient-to-r from-sky-300 from-10% via-fuchsia-300 via-30% to-rose-500 to-90% inline-block text-transparent bg-clip-text text-8xl p-10">Coming Soon</Heading2>
		</div>
	);
}
