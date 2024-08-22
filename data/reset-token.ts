import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/db";

export const generateResetToken = async (email: string) => {
	try {
		const token = uuid();

		const expires = new Date(Date.now() + 3600 * 1000);

		const existingToken = await prisma.resetToken.findFirst({
			where: { email },
		});

		if (existingToken) await deleteResetToken(existingToken.id);

		const newToken = await prisma.resetToken.create({
			data: {
				email,
				expires,
				token,
			},
		});

		return newToken;
	} catch (error) {}
};

export const getResetTokenByToken = async (token: string) => {
	try {
		const existingToken = await prisma.resetToken.findFirst({
			where: { token },
		});

		return existingToken;
	} catch (error) {}
};

export const deleteResetToken = async (id: string) => {
	try {
		await prisma.resetToken.delete({ where: { id } });
	} catch (error) {}
};
