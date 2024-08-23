"use client";

import { useCallback, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { uploadFile } from "@/actions/file-upload";
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
import Image from "next/image";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

interface RejectedFileType {
	file: File;
	errors: { code: string; message: string }[];
}

export default function FileDropZone() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [files, setAcceptedFiles] = useState<File[]>([]);

	const onDrop = useCallback(
		async (acceptedFiles: File[], rejectedFiles: RejectedFileType[]) => {
			// Do something with the files

			setAcceptedFiles([
				...files,
				...acceptedFiles.filter(
					(file) =>
						file.type !== "" &&
						!files.map((f) => f.name).includes(file.name)
				),
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
		maxSize: 2 * 1024 * 1024,
		maxFiles: 5,
	});

	const renderSize = (size: number) => {
		if (size < 1024) {
			return `${(size / 1024).toFixed(2)} KB`;
		}
		return `${(size / (1024 * 1024)).toFixed(2)} MB`;
	};

	const renderPreview = (file: File) => {
		if (file.type.startsWith("image")) {
			const url = URL.createObjectURL(file);
			return url;
		} else if (file.type.startsWith("video")) {
			return "/video.png";
		} else if (file.type.startsWith("text")) {
			return "/text.png";
		} else if (file.type === "application/pdf") {
			return "/pdf.png";
		} else {
			return "/file.png";
		}
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
				<input {...getInputProps()} disabled={isPending} />
				{isDragActive ? (
					<p className="text-center">Drop the files here ...</p>
				) : (
					<p className="text-center">
						Drag and drop drop some files here, or click to select
						files
					</p>
				)}
			</div>

			<div className="relative w-full max-w-2xl min-h-96 flex flex-col border rounded-lg border-slate-600">
				<Table className="h-full w-ful py-10">
					<TableCaption></TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="min-w-16 text-center"></TableHead>
							<TableHead className="w-full min-w-60">
								Name
							</TableHead>
							<TableHead className="min-w-32 text-center">
								Size
							</TableHead>
							<TableHead className="min-w-10"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="">
						{files.map((file) => {
							return (
								<TableRow
									key={file.name}
									className="h-16 border-0">
									<TableCell className="text-center">
										<Image
											src={renderPreview(file)}
											alt=""
											width={32}
											height={32}
										/>
									</TableCell>
									<TableCell className="font-medium">
										{file.name}
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
					className="w-full mt-auto"
					disabled={isPending || files.length === 0}
					onClick={() => {
						const formData = new FormData();
						files.forEach((file) => {
							formData.append("file", file);
						});
						startTransition(() => {
							uploadFile(formData).then((data) => {
								setError(data?.error);
								setSuccess(data?.success);
								setAcceptedFiles([]);
							});
						});
					}}>
					{isPending ? "Uploading..." : "Upload"}
				</Button>
			</div>

			<div className="w-full justify-center flex flex-col items-center gap-4 max-w-2xl">
				<FormError message={error} />
				<FormSuccess message={success} />
			</div>
		</section>
	);
}
