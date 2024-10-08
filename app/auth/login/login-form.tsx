"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import CardWrapper from "../card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked" ||
		searchParams.get("error") === "Configuration"
			? "Email already in use with different provider"
			: "";

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		startTransition(async () => {
			login(values, callbackUrl).then((data) => {
				setError(data?.error || "");
				setSuccess(data?.success || "");
			});
		});
	};

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name={"email"}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="suudi@gmail.com"
											type="email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={"password"}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="**********"
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						size={"sm"}
						variant={"link"}
						asChild
						className="px-0">
						<Link href={"/auth/reset"}>Forgot password?</Link>
					</Button>

					<FormError message={error || urlError} />
					<FormSuccess message={success} />

					<Button
						type="submit"
						disabled={isPending}
						className="w-full">
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
