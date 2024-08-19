import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export const RegisterSchema = z
	.object({
		email: z.string().email({
			message: "Email is required",
		}),
		password: z.string().min(6, {
			message: "Password must be 6 characers minimum",
		}),
		confirmPassword: z.string().min(6,  {
			message: "Password must be 6 characers minimum",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
