"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import NewPasswordForm from "./new-pass-form";
import { BeatLoader } from "react-spinners";

export default function ResetPage() {
	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	useEffect(() => {
		if (!token) {
			// setResponse({ error: "Missing token!" });
		}
	}, [token]);

	if (token) return <NewPasswordForm token={token} />;
	else return <BeatLoader />
}
