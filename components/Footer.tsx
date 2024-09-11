import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="p-5 flex justify-around border-t-[1px] border-opacity-10 max-w-screen-xl mx-auto mt-auto w-full">
			<p className="text-xs">@2024 Dalo Drive</p>
			<ul className="flex gap-3">
				<li>
					<Link href={"https://github.com/iamsuudi/file-uploader"}>
						<GitHubLogoIcon />
					</Link>
				</li>
				<li>
					<Link href={"https://linkedin.com/in/iamsuudi"}>
						<LinkedInLogoIcon />
					</Link>
				</li>
			</ul>
		</footer>
	);
}
