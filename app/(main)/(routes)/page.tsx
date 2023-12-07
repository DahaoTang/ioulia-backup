"use client";

// import React, { useState, useEffect } from "react";
import { Heading2 } from "@/components/headings";

export default function Home() {
	// const [showComingSoon, setShowComingSoon] = useState(false);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setShowComingSoon(true);
	// 	}, 4000);

	// 	return () => clearTimeout(timer);
	// }, []);

	return (
		<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-200 from-10% via-neutral-400 via-50% to-neutral-200 to-90% dark:bg-gradient-to-br dark:from-neutral-950 dark:from-10% dark:via-neutral-700 dark:via-50% dark:to-neutral-950 dark:to-90%">
			{/* {!showComingSoon ? (
				<div className="animate-horizontal-expand text-6xl p-10 bg-gradient-to-r from-sky-300 from-10% via-fuchsia-300 via-30% to-rose-500 to-90% inline-block text-transparent bg-clip-text">
					Your personal AI assistant close as a friend
				</div>
			) : ( */}
			<Heading2 className="animate-horizontal-expand text-8xl p-10 bg-gradient-to-r from-sky-300 from-10% via-fuchsia-300 via-30% to-rose-500 to-90% inline-block text-transparent bg-clip-text">
				Coming Soon
			</Heading2>
			{/* )} */}
		</div>
	);
}
