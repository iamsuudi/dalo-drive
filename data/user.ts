import { prisma } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		return null;
	}
};

export const UpdateUserById = async (id: string, newEmail: string) => {
	try {
		const user = await prisma.user.update({
			where: { id },
			data: { emailVerified: new Date(), email: newEmail },
		});
		return user;
	} catch (error) {
		return null;
	}
};
