import { signOut } from "@/auth";
import React from "react";

export default function SignoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<form
			className="flex"
			action={async () => {
				"use server";

				await signOut();
			}}>
			{children}
		</form>
	);
}
