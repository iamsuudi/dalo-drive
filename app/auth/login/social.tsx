"use client";

import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Social() {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button size={"lg"} variant={"outline"} className="w-full" onClick={() => {}}>
				<GitHubLogoIcon />
			</Button>
		</div>
	);
}
