export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-[100dvh] flex items-center justify-center px-5 py-20 w-full">
			{children}
		</div>
	);
}
