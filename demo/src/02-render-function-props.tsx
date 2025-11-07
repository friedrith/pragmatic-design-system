import { useState } from "react";
import { ClearButton } from "./utils/clear-button";

export const title = "Render Function Props";

interface InputProps {
	renderEndDecorator: (value: string) => React.ReactNode;
}

export function Input({ renderEndDecorator }: InputProps) {
	const [value, setValue] = useState("");

	return (
		<div className="input-container">
			<input
				className="input"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			{renderEndDecorator(value)}
		</div>
	);
}

export function Example() {
	return (
		<Input renderEndDecorator={(value: string) => value && <ClearButton />} />
	);
}

// Gives a lot of flexibility but the renderEndDecorator is just a function and doesn't optimize the rendering process.
