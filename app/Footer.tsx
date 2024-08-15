import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
	return (
		<footer className="p-5 flex justify-around border-t-[1px] border-opacity-10 max-w-screen-xl mx-auto mt-auto w-full">
			<p className="text-xs">@2024 Dalo Drive</p>
			<ul className="flex gap-3">
				<li>
					<GitHubLogoIcon />
				</li>
                <li>
					<LinkedInLogoIcon />
                </li>
			</ul>
		</footer>
	);
}
