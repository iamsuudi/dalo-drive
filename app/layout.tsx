import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/theme-provider";

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
				style={{
					backgroundImage: 'url("/Rect-Light.svg")',
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: "fixed",
					height: "full", // Example height, adjust as needed
				}}
				className={cn(
					"min-h-screen bg-background font-sans antialiased w-screen overflow-x-hidden flex-col flex"
				)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange>
					<NavBar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
