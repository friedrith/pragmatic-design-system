import { XCircleIcon } from "@heroicons/react/24/outline";

type ClearButtonProps = {
	onClick?: () => void;
};

export function ClearButton({ onClick = () => {} }: ClearButtonProps) {
	return (
		<div className="end-decorator">
			<button className="button" onClick={onClick} type="button">
				<XCircleIcon className="h-8 w-8" />
			</button>
		</div>
	);
}
