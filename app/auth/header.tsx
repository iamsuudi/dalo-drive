export default function Header({ label }: { label: string }) {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center">
			<h1 className={"text-3xl font-black"}>Auth</h1>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	);
}
