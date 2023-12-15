"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	CreateRecordSchema,
	createRecordSchema,
} from "@/lib/validation/record";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddRecordProps {
	userId: string;
}

const AddRecord: React.FC<AddRecordProps> = ({ userId }) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateRecordSchema>({
		resolver: zodResolver(createRecordSchema),
	});

	async function onSubmit(inputData: CreateRecordSchema) {
		try {
			const response = await fetch("/api/records", {
				method: "POST",
				body: JSON.stringify(inputData),
			});
			if (response.ok) {
				console.log(response);
				console.log(userId);
				reset();
				router.refresh();
			} else {
				throw Error("Status code: " + response.status);
			}
		} catch (error) {
			console.error(error);
			alert(
				"Something went wrong when trying to create a record. Please try again"
			);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Records</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a new Record</DialogTitle>
					<DialogDescription>
						<br />
						Create a new Record manually so that your AI assitant will remember
						it the future conversations.
						<br />
						<br />
						Please note like, just like a real human friend / secratery, if some
						thing is not brought up during a long peirod of time, humans tend to
						forget it. Similarly your AI assistant may delete the record for
						more space or give it a very low priority when searching through the
						database if the record is not brought up during conversations in a
						very long period of time.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								id="title"
								defaultValue=""
								className="col-span-3"
								{...register("title")}
							/>
						</div>
						<div className="w-full flex items-center justify-center">
							{errors.title && typeof errors.title.message === "string" && (
								<p className="text-rose-300">{errors.title.message}</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="content" className="text-right">
								Content
							</Label>
							<Textarea
								id="content"
								defaultValue=""
								className="col-span-3 h-[20vh]"
								{...register("content")}
							/>
						</div>
						<div className="w-full flex items-center justify-center">
							{errors.content && typeof errors.content.message === "string" && (
								<p className="text-rose-300">{errors.content.message}</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="submit">Create Record</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddRecord;
