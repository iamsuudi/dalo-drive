"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";

import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/actions/auth";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

export default function ConfirmationPage() {
	const [response, setResponse] = useState<
		{ error?: string; success?: string } | undefined
	>(undefined);

	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	useEffect(() => {
		if (token) {
			verifyEmail(token)
				.then((data) => {
					setResponse({ error: data.error });
					setResponse({ success: data.success });
				})
				.catch((error) => {
					setResponse({ error: "Something went wrong!" });
				});
		} else {
			setResponse({ error: "Missing token!" });
		}
	}, [token]);

	return (
		<CardWrapper
			headerLabel="Confirm your verification"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login">
			<div className="flex items-center justify-center w-full">
				{!response?.error && !response?.success && <BeatLoader color="gray" />}
				<FormSuccess message={response?.success} />
				<FormError message={response?.error} />
			</div>
		</CardWrapper>
	);
}
