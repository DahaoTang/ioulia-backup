"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import {
	deleteRecordSchema,
	updateRecordSchema,
} from "@/lib/validation/record";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogOverlay,
	DialogTrigger,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
	const router = useRouter();

	const [query, setQuery] = useState("");
	const [allRecords, setAllRecords] = useState([]);
	const [currentRecordId, setCurrentRecordId] = useState<number | null>(null);
	const [currentRecordTitle, setCurrentRecordTitle] = useState("");
	const [currentRecordContent, setCurrentRecordContent] = useState("");

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

	const handleManageButtonClick = (
		recordId: number,
		recordTitle: string,
		recordContent: string
	) => {
		setCurrentRecordId(recordId);
		setCurrentRecordTitle(recordTitle);
		setCurrentRecordContent(recordContent);
		router.refresh();
	};

	const handleSubmit = async () => {
		if (currentRecordId !== null) {
			const dataToUpdate = {
				id: currentRecordId.toString(),
				title: currentRecordTitle,
				content: currentRecordContent,
			};
			try {
				const validatedData = updateRecordSchema.parse(dataToUpdate);
				const response = await fetch("/api/records", {
					method: "PUT",
					body: JSON.stringify(validatedData),
				});
				if (response.ok) {
					console.log("Update successful");
					handleSearch(userId);
				} else {
					throw Error("Status code: " + response.status);
				}
			} catch (error) {
				if (error instanceof z.ZodError) {
					console.error("Validation error:", error.errors);
					alert(error.errors[0].message);
				} else {
					console.error("Fetch error:", error);
				}
			}
		}
	};

	const handleDelete = async () => {
		if (currentRecordId !== null) {
			const dataToUpdate = {
				id: currentRecordId.toString(),
			};
			try {
				const validatedData = deleteRecordSchema.parse(dataToUpdate);
				const response = await fetch("/api/records", {
					method: "DELETE",
					body: JSON.stringify(validatedData),
				});
				if (response.ok) {
					console.log("Delete successful");
					handleSearch(userId);
				} else {
					throw Error("Status code: " + response.status);
				}
			} catch (error) {
				if (error instanceof z.ZodError) {
					console.error("Validation error:", error.errors);
					alert(error.errors[0].message);
				} else {
					console.error("Fetch error:", error);
				}
			}
		}
	};

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
							<Dialog>
								<DialogTrigger asChild>
									<Button
										onClick={() => {
											handleManageButtonClick(
												record.id,
												record.title,
												record.content
											);
										}}
									>
										Manage
									</Button>
								</DialogTrigger>
								<DialogOverlay />
								<DialogContent style={{ width: "36vw", height: "72vh" }}>
									<DialogTitle className="h-[3vh]">Manage Record</DialogTitle>
									<DialogDescription>
										<br />
										Create a new Record manually so that your AI assitant will
										remember it the future conversations.
										<br />
										<br />
										Please note like, just like a real human friend / secratery,
										if some thing is not brought up during a long peirod of
										time, humans tend to forget it. Similarly your AI assistant
										may delete the record for more space or give it a very low
										priority when searching through the database if the record
										is not brought up during conversations in a very long period
										of time.
									</DialogDescription>
									<div className="w-full h-[30vh]">
										<div className="w-full flex flex-row items-center p-3">
											<Label htmlFor="title" className="text-right pr-9">
												Title
											</Label>
											<Input
												id="title"
												value={currentRecordTitle}
												onChange={(e) => {
													setCurrentRecordTitle(e.target.value);
												}}
												className="col-span-3"
											/>
										</div>
										<div className="w-full flex items-center justify-center"></div>
										<div className="w-full flex flex-row items-center p-3">
											<Label htmlFor="content" className="text-right pr-3">
												Content
											</Label>
											<Textarea
												id="content"
												value={currentRecordContent}
												onChange={(e) => {
													setCurrentRecordContent(e.target.value);
												}}
												className="col-span-3 h-[20vh]"
											/>
										</div>
										<div className="w-full flex items-center justify-center"></div>
									</div>
									<DialogFooter className="w-full h-[7vh] items-center">
										<DialogClose asChild className="w-[15%]">
											<Button
												variant="destructive"
												onClick={() => {
													handleDelete();
												}}
											>
												Delete
											</Button>
										</DialogClose>
										<DialogClose asChild className="w-[85%]">
											<Button
												onClick={() => {
													handleSubmit();
												}}
											>
												Save
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Records;
