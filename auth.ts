import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { prisma } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Allow 0Auth without email verification
			if (account?.provider !== "credentials") return true;

			const existingUser = await getUserById(user.id as string);

			// Prevent sign in without email verification
			if (!existingUser?.emailVerified) return false;

			// TODO: Add 2FFA check
			return true;
		},
		async session({ session, token }) {
			if (session?.user && token?.role) {
				session.user.role = token.role as UserRole;
				session.user.id = token.sub as string;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			token.role = existingUser?.role;

			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});
