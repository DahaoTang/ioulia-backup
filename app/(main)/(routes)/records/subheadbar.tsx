"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AddRecord from "@/app/(main)/(routes)/records/addRecord";
import { useState } from "react";

interface SubHeadBarProps {
	userId: string;
}

const SubHeadBar: React.FC<SubHeadBarProps> = ({ userId }) => {
	return (
		<div className="w-full flex flex-row justify-between mb-5">
			<div className="flex flex-row">
				<Input className="w-[50vw]" />
				<Button className="ml-5" variant="outline">
					Search
				</Button>
			</div>
			<div className="ml-10">
				<AddRecord userId={userId} />
			</div>
		</div>
	);
};

export default SubHeadBar;
