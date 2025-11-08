import { CheckIndicator } from "./utils/check-indicator";
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
		<>
			<Input endDecorator={<ClearButton />} />
			<Input endDecorator={<CheckIndicator />} />
		</>
	);
}

// But how to improve the interactivity of decorator?
