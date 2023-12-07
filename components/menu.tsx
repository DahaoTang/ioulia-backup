"use client";

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
	const { setTheme } = useTheme();
	return (
		<Menubar className="outline outline-sky-300">
			<MenubarMenu>
				<MenubarTrigger>Services</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>AI Assistant</MenubarItem>
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
			<UserButton afterSignOutUrl="/" />
		</Menubar>
	);
}
