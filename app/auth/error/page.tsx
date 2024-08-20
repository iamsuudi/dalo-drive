import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "../card-wrapper";

export default function ErrorPage() {
	return (
		<CardWrapper
			headerLabel="Oops! Something went wrong!"
			backButtonLabel="Back to login page"
			backButtonHref="/auth/login">
			<div className="w-full flex justify-center items-center text-red-500">
				<ExclamationTriangleIcon className="size-7" />
			</div>
		</CardWrapper>
	);
}
