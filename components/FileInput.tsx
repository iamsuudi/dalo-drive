"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { uploadFile } from "@/lib/actions";
import { toast } from "sonner";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface RejectedFileType {
	file: File;
	errors: { code: string; message: string }[];
}

export default function FileDropZone() {
	const [files, setAcceptedFiles] = useState<File[]>([]);

	const onDrop = useCallback(
		async (acceptedFiles: File[], rejectedFiles: RejectedFileType[]) => {
			// Do something with the files

			setAcceptedFiles((previousFiles) => [
				...previousFiles,
				...acceptedFiles.filter((file) => file.type !== ""),
			]);

			acceptedFiles
				.filter((file) => !file.type)
				.map((file) =>
					toast(file.name, {
						description: "Directories are not accepted",
						action: {
							label: "Reject",
							onClick: () => console.log("Reject"),
						},
					})
				);

			rejectedFiles.map(({ file, errors }) =>
				toast(file.name, {
					description: errors[0].message,
					action: {
						label: "Reject",
						onClick: () => console.log("Reject"),
					},
				})
			);
		},
		[]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxSize: 1024 * 2000,
	});

	const renderSize = (size: number) => {
		if (size > 1000) {
			return `${(size / 1000).toFixed(2)} KB`;
		}
		return `${(size / (1000 * 1000)).toFixed(2)} MB`;
	};

	return (
		<section className="flex flex-wrap w-full h-full gap-10 items-start justify-center">
			<div
				{...getRootProps({
					className: clsx({
						"border border-dashed w-80 h-60 flex items-center justify-center text-gray-400 p-5":
							true,
						"bg-white/5": !isDragActive,
						"bg-white/15": isDragActive,
					}),
				})}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p className="text-center">Drop the files here ...</p>
				) : (
					<p className="text-center">
						Drag and drop drop some files here, or click to select
						files
					</p>
				)}
			</div>

			<div className="relative w-full max-w-2xl h-96 border rounded-lg border-slate-600">
				<Table className="h-full w-full border-collapse">
					<TableCaption></TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-full min-w-60">
								Name
							</TableHead>
							<TableHead className="min-w-32 text-center">
								Type
							</TableHead>
							<TableHead className="min-w-32 text-center">
								Size
							</TableHead>
							<TableHead className="min-w-10"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{files.map((file) => {
							return (
								<TableRow key={file.name}>
									<TableCell className="font-medium">
										{file.name}
									</TableCell>
									<TableCell className="text-center">
										{file.type.toString()}
									</TableCell>
									<TableCell className="text-center">
										{renderSize(file.size)}
									</TableCell>
									<TableCell>
										<Trash
											className="size-5 stroke-red-500 hover:cursor-pointer"
											onClick={() => {
												setAcceptedFiles(
													files.filter(
														(f) =>
															f.name !== file.name
													)
												);
											}}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<Button
					className="absolute bottom-0 w-full"
					onClick={async () => {
						const formData = new FormData();
						files.forEach((file) => {
							formData.append("file", file);
						});
						await uploadFile(formData);
					}}>
					Upload
				</Button>
			</div>
		</section>
	);
}
