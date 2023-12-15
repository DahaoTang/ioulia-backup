"use client";

import { useCallback, useEffect, useState } from "react";

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

interface RecordsProps {
	userId: string;
}

type Record = {
	id: number;
	title: string;
	content: string;
};

const Records: React.FC<RecordsProps> = ({ userId }) => {
	const [query, setQuery] = useState("");
	const [allRecords, setAllRecords] = useState([]);

	const handleSearch = useCallback(
		async (userId: string) => {
			try {
				const response = await fetch(`/api/records?query=${query}`, {
					method: "GET",
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setAllRecords(data.records);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		},
		[query]
	);

	useEffect(() => {
		handleSearch(userId);
	}, [userId, handleSearch]);

	return (
		<div>
			<div className="w-full flex flex-row justify-between mb-5">
				<div className="flex flex-row">
					<Input
						placeholder="Search here..."
						className="w-[50vw]"
						onChange={(e) => {
							setQuery(e.target.value);
						}}
					/>
				</div>
				<div className="ml-10">
					<AddRecord userId={userId} />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{allRecords.map((record: Record) => (
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
};

export default Records;
function useCallBack(arg0: (userId: string) => any) {
	throw new Error("Function not implemented.");
}
