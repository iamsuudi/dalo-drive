"use server";

import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" };

				default:
					return { error: "Something went wrong!" };
			}
		}
		throw error;
	}

	return { success: "Verification Email is sent!" };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const emailTaken = await getUserByEmail(email);

	if (emailTaken) {
		return { error: "Email is already in use" };
	}

	await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	// Send verification

	return { success: "Verification Email is sent!" };
};
