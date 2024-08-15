import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import NavBar from "./NavBar";

export const metadata: Metadata = {
	title: "Dalo File Uploader",
	description: "Affordable, fast and secure file uploader",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased"
				)}>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
