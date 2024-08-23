import { CheckCircledIcon } from "@radix-ui/react-icons";

export const FormSuccess = ({ message }: { message?: string }) => {
	if (!message) return null;

	return (
		<div className="p-3 text-emerald-500 bg-green-100/10 rounded-md flex items-center gap-x-2 text-sm w-full">
			<CheckCircledIcon />
			<p>{message}</p>
		</div>
	);
};
