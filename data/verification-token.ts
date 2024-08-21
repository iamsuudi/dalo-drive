import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await prisma.verificationToken.findFirst({
			where: { email },
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await prisma.verificationToken.findFirst({
			where: { token },
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
};

export const generateVerificationToken = async (email: string) => {
	try {
		const token = uuid();
		const expires = new Date(Date.now() + 3600 * 1000);

		const existingToken = await prisma.verificationToken.findFirst({
			where: { email },
		});

		if (existingToken) {
			await deleteVerificationToken(existingToken.id);
		}

		const verificationToken = await prisma.verificationToken.create({
			data: {
				email,
				token,
				expires,
			},
		});
		console.log({ verificationToken });

		return verificationToken;
	} catch (error) {}
};

export const deleteVerificationToken = async (id: string) => {
	await prisma.verificationToken.delete({ where: { id } });
};
