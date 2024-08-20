import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const FormError = ({ message }: { message?: string }) => {
	if (!message) return null;

	return (
		<div className="p-3 text-red-500 bg-red-100/10 rounded-md flex items-center gap-x-2 text-sm">
			<ExclamationTriangleIcon />
			<p>{message}</p>
		</div>
	);
};
