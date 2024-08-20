"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {
	const clickHandler = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				size={"lg"}
				variant={"outline"}
				className="w-full"
				onClick={() => clickHandler("github")}>
				<FaGithub />
			</Button>
			<Button
				size={"lg"}
				variant={"outline"}
				className="w-full"
				onClick={() => clickHandler("github")}>
				<FcGoogle />
			</Button>
		</div>
	);
}
