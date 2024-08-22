import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const publicOrigin = process.env.NEXTJS_PUBLIC_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${publicOrigin}/auth/new-verification?token=${token}`;
	
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Confirm your email",
		html: `<p>Click <a href="${confirmLink}">here</a> to confirm</p>`,
	});
	
	console.log({ confirmLink });
};

export const sendResetVerification = async (email: string, token: string) => {
	const confirmLink = `${publicOrigin}/auth/reset-verification?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Reset password confirmation",
		html: `<p>Click <a href="${confirmLink}">here</a> to confirm</p>`,
	});

	console.log({ confirmLink });
};
