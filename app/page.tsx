import { Button } from "@/components/ui/button";
import { DatabaseBackup, ShieldCheck, Usb } from "lucide-react";

export default function Home() {
	return (
		<main className="flex flex-col items-center p-5 gap-7 w-full py-20">
			<h1 className="sm:text-6xl text-3xl font-bold flex flex-col text-center gap-3">
				Revolutionize Your <span>Cloud Experience</span>
			</h1>
			<p className="max-w-xl text-center">
				Unlock instant, secure and seamless cloud storage. Upload,
				manage, share and download files efffortlessly, with the ability
				to integrate multiple folders.
			</p>
			<div className="flex gap-2">
				<Button className="py-6 px-8">Start Now</Button>
				<Button variant={"ghost"} className="py-6 px-8 border">Explore More</Button>
			</div>

			<div className="flex p-4 w-screen flex-wrap justify-center gap-5 mt-32">
				<div className="backdrop-blur-sm bg-white/5 max-w-sm space-y-3 p-7 rounded-lg">
					<ShieldCheck className="size-10" />
					<p className="text-lg font-bold">Secure Upload</p>
					<p className="text-sm">
						Dalo Drive ensures your files are uploaded instantly,
						with top-notch security.
					</p>
				</div>
				<div className="backdrop-blur-sm bg-white/5 max-w-sm space-y-3 p-7 rounded-lg">
					<Usb className="size-10" />
					<p className="text-lg font-bold">Seamless Integration</p>
					<p className="text-sm">
						Enjoy easy access and organization of your files into
						folders.
					</p>
				</div>
				<div className="backdrop-blur-sm bg-white/5 max-w-sm space-y-3 p-7 rounded-lg">
					<DatabaseBackup className="size-10" />
					<p className="text-lg font-bold">
						Multi-concurrency Support
					</p>
					<p className="text-sm">
						Effortlessly upload and download from multple devices.
						Dalo drive simplifies integrations.
					</p>
				</div>
			</div>
		</main>
	);
}
