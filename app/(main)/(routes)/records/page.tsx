"use client";

import { useUser } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AddRecord from "@/app/(main)/(routes)/records/addRecord";
import { useEffect, useState } from "react";

export default function RecordsPage() {
	const { user } = useUser();
	const userId = user?.id;

	// if (!userId) throw Error("userId undefined");

	useEffect({handleSearch(userId)})

	const [query, setQuery] = useState("");
	const [allRecords, setAllRecords] = useState([]);

	const handleSearch = async (userId: string) => {
		console.log("Query: ", query);
		try {
			const records = await prisma.record.findMany({
				where: {
					userId: userId,
					OR: [
						{
							title: {
								contains: query,
								mode: "insensitive",
							},
						},
						{
							content: {
								contains: query,
								mode: "insensitive",
							},
						},
					],
				},
			});
			console.log("Records: ", records);
		} catch (error) {
			console.error("Error when fetching the records: ", error);
		}
	};

	return (
		<div className="m-5">
			<div className="w-full flex flex-row justify-between mb-5">
				<div className="flex flex-row">
					<Input
						className="w-[50vw]"
						onChange={(e) => {
							setQuery(e.target.value);
						}}
					/>
					<Button
						className="ml-5"
						variant="outline"
						onClick={() => {
							handleSearch(userId);
						}}
					>
						Search
					</Button>
					{/* <Input className="w-[50vw]" />
					<Button className="ml-5" variant="outline">
						Search
					</Button> */}
				</div>
				<div className="ml-10">
					<AddRecord userId={userId} />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{allRecords.map((record) => (
					<Card key={record.id} className="h-[36vh]">
						<CardHeader className="h-[8vh]">
							<CardTitle
								className={`overflow-hidden ${
									record.title.length > 30 ? "text-md" : ""
								}`}
							>
								{record.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="h-[21vh] overflow-hidden">
							<div className="h-full overflow-hidden">{record.content}</div>
						</CardContent>
						<CardFooter className="w-full h-[7vh] items-center justify-end">
							<Button>Manage</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
