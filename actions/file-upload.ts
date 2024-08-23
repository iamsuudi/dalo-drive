"use server";

import path from "path";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

export const uploadFile = async (formData: FormData) => {
	const files = formData.getAll("file") as unknown as FileList;

	for (const file of Array.from(files)) {
		const uploadDir = path.join(process.cwd(), "public", "uploads");

		if (!existsSync(uploadDir)) {
			mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, file.name);

		try {
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Write the file to the filesystem
			await writeFile(filePath, buffer);

			console.log(filePath);
			return { success: `Uploaded successfully!` };
		} catch (error) {
			console.error("Error saving file:", error);
			return { error: `Something went wrong!` };
		}
	}
};
