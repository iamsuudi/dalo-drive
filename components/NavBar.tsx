import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	HandHelping,
	LogIn,
	Menu,
	ShoppingCart,
	Store,
	Waypoints,
} from "lucide-react";
import Link from "next/link";
import SignoutWrapper from "./signout-wrapper";

async function NavBar() {
	const session = await auth();

	return (
		<header className="flex justify-between items-center px-10 py-6 max-w-screen-xl mx-auto w-full">
			<Link href={"/"} className="font-bold text-xl">
				Dalo Drive
			</Link>

			<ul className="lg:flex hidden text-sm gap-5">
				<li>About</li>
				<li>Products</li>
				<li>Resources</li>
				<li>Support</li>
			</ul>

			<div className="lg:flex hidden gap-5">
				{!session && (
					<Link href={"/auth/login"}>
						<Button variant={"ghost"} className="border">
							Sign In
						</Button>
					</Link>
				)}
				{!session && (
					<Link href={"/auth/register"}>
						<Button>Sign Up</Button>
					</Link>
				)}
				{session && (
					<SignoutWrapper>
						<Button>Log Out</Button>
					</SignoutWrapper>
				)}
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild className="outline-none lg:hidden">
					<button>
						<Menu />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 mr-10">
					<DropdownMenuItem>
						<Store className="mr-2 h-4 w-4" />
						<span>About</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShoppingCart className="mr-2 h-4 w-4" />
						<span>Products</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Waypoints className="mr-2 h-4 w-4" />
						<span>Resources</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<HandHelping className="mr-2 h-4 w-4" />
						<span>Support</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<SignoutWrapper>
							<LogIn className="mr-2 h-4 w-4" />
							<button>Sign Up</button>
						</SignoutWrapper>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}

export default NavBar;
