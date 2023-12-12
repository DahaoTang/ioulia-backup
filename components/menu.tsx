"use client";

import { useRouter } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";

export function Menu() {
	const router = useRouter();
	const { setTheme } = useTheme();

	return (
		<div className="flex flex-row items-center">
			<Menubar className="outline outline-sky-300 mr-5">
				<MenubarMenu>
					<MenubarTrigger>Chat</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={() => router.push("/chat")}>
							Chatbot
						</MenubarItem>
						<MenubarItem onClick={() => router.push("/records")}>
							Records
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Colour Theme</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={() => setTheme("light")}>Light</MenubarItem>
						<MenubarItem onClick={() => setTheme("dark")}>Dark</MenubarItem>
						<MenubarItem onClick={() => setTheme("system")}>System</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
}
