import { ClearButton } from "./utils/clear-button";

export const title = "Composition";

interface InputProps {
	endDecorator: React.ReactNode;
}

export function Input({ endDecorator }: InputProps) {
	return (
		<div className="input-container">
			<input className="input" />
			{endDecorator}
		</div>
	);
}

export function Example() {
	return (
		<div className="example-container">
			<Input endDecorator={<ClearButton />} />
		</div>
	);
}

// But how to improve the interactivity of decorator?
