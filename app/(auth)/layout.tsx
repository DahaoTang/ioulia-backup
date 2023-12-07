import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: "ioulia",
	description: "Personal AI Assistant",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full flex justify-center items-center">
			{children}
		</div>
	);
}
