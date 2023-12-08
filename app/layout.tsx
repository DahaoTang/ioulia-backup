import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Heading1 } from "@/components/headings";
import { Menu } from "@/components/menu";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: "ioulia",
	description: "Personal AI Assistant",
};

function Header() {
	return (
		<header className="w-full h-[8vh] flex flex-row items-center">
			<div>
				<Heading1 className="pl-10 text-sky-600">ioulia</Heading1>
			</div>
			<div className="w-full flex items-center justify-end pr-10">
				<SignedOut>
					<SignInButton afterSignInUrl="/" afterSignUpUrl="/sign-in" />
				</SignedOut>
				<SignedIn>
					<Menu />
				</SignedIn>
			</div>
		</header>
	);
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={cn(outfit.className, "min-h-screen")}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={true}
						disableTransitionOnChange
					>
						<div className="h-full">
							<Header />
							<div className="h-[89vh] bg-neutral-100 dark:bg-neutral-900 overflow-auto">
								{children}
							</div>
							<div className="h-[3vh] flex items-center justify-center">
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
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
