import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
	title: "Dalo Drive",
	description: "Affordable, fast and secure file uploader",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("min-h-screen font-sans antialiased")}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange>
					<NavBar />
					{children}
					<Footer />
					<Toaster className="bg-transparent bg-none backdrop-blur-sm" />
				</ThemeProvider>
			</body>
		</html>
	);
}
