"use server";

import {
	LoginSchema,
	RegisterSchema,
	ResetEmailSchema,
	ResetPasswordTokenSchema,
} from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import {
	getUserByEmail,
	updateUserPassword,
	verifyUserEmail,
} from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
	deleteVerificationToken,
	generateVerificationToken,
	getVerificationTokenByToken,
} from "@/data/verification-token";
import { sendResetVerification, sendVerificationEmail } from "@/lib/mail";
import {
	deleteResetToken,
	generateResetToken,
	getResetTokenByToken,
} from "@/data/reset-token";

export const login = async (
	values: z.infer<typeof LoginSchema>,
	callbackUrl: string | null
) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (existingUser && !existingUser.emailVerified) {
		const newToken = await generateVerificationToken(email);

		if (newToken?.token) await sendVerificationEmail(email, newToken.token);
		return { success: "Please confirm your email!" };
	}

	console.log({ callbackUrl });

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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

	const verificationToken = await generateVerificationToken(email);

	// Send verification
	if (verificationToken?.token)
		await sendVerificationEmail(email, verificationToken.token);

	return { success: "Confirmation email is sent!" };
};

export const verifyEmail = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);
	console.log({ existingToken });

	if (!existingToken) {
		return { error: "Token doesn't exist!" };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token has expired!" };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: "User with this email doesn't exist!" };
	}

	await verifyUserEmail(existingUser.id, existingToken.email);

	// await deleteVerificationToken(existingToken.id);

	return { success: "Email verified!" };
};

export const reset = async (values: z.infer<typeof ResetEmailSchema>) => {
	const validatedFields = ResetEmailSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid email" };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) return { error: "Unknown email" };

	const resetToken = await generateResetToken(email);

	if (resetToken) await sendResetVerification(email, resetToken.token);

	return { success: "Verification code is sent!" };
};

export const verifyPasswordReset = async (
	values: z.infer<typeof ResetPasswordTokenSchema>
) => {
	const validatedFields = ResetPasswordTokenSchema.safeParse(values);

	if (!validatedFields.success) return { error: "Invalid fields" };

	const { token, password, confirmPassword } = validatedFields.data;

	const existingToken = await getResetTokenByToken(token);

	if (!existingToken) {
		return { error: "Token doesn't exist!" };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token has expired!" };
	}

	if (password !== confirmPassword) {
		return { error: "Passwords don't match" };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: "User with this email doesn't exist!" };
	}

	await updateUserPassword(existingUser.id, password);

	// await deleteResetToken(existingToken.id);

	return { success: "Password reser successfull!" };
};
