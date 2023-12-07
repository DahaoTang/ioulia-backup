"use client";

import { Heading1 } from "@/components/Headings";

export default function Home() {
	return (
		<div className="w-full h-full flex flex-col bg-gradient-to-br from-emerald-300 from-10% via-blue-300 via-30% to-fuchsia-300 to-90%">
			<div className="pl-1">
				<Heading1 className="text-sky-600">ioulia</Heading1>
				<div className="pt-1 text-sky-800">
					Your personal AI assistant close as a friend.
				</div>
			</div>
			<div className="h-screen flex flex-col justify-center items-center bg-rose-300">
				<Heading1 className="text-sky-600 pb-20">Coming Soon</Heading1>
			</div>
			<div className="h-auto flex justify-center items-center bg-rose-300">
				<div className="pb-1 text-neutral-500">
					Developed by{" "}
					<a
						className="underline"
						href="https://dahaotang.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Dahao Tang
					</a>
					.&nbsp;2023
				</div>
			</div>
		</div>
	);
}
