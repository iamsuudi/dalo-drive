import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
	label: string;
	href: string;
}

const BackButton: React.FunctionComponent<BackButtonProps> = ({
	label,
	href,
}: BackButtonProps) => {
	return (
		<Button
			variant={"link"}
			size={"sm"}
			className="font-normal w-full"
			asChild>
			<Link href={href}>{label}</Link>
		</Button>
	);
};

export default BackButton;
