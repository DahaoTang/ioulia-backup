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
		<ClerkProvider>
			<html lang="en">
				<body className={outfit.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
