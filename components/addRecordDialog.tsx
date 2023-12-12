import { CreateRecordSchema, createRecordSchema } from "@/lib/validation/record";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

interface addRecordDialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function AddRecordDialog({ open, setOpen }: addRecordDialogProps) {
	const form = useForm<CreateRecordSchema>({
		resolver: zodResolver(createRecordSchema),
	});

	async function onSubmit(input: CreateRecordSchema) {
		alert(input);
	}

	return (
	<Dialog open={open} onOpenChange={setOpen}>
		<DialogContent>
			<DialogHeader>Add Note</DialogHeader>
		</DialogContent>
	</Dialog>
	);
}
