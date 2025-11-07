import { useState } from "react";
import { ClearButton } from "./utils/clear-button";

export const title = "Render Component Props";

interface InputProps {
	renderEndDecorator: ({
		value,
		onChange,
	}: {
		value: string;
		onChange: (value: string) => void;
	}) => React.ReactNode;
}

export function Input({ renderEndDecorator: RenderEndDecorator }: InputProps) {
	const [value, setValue] = useState("");

	return (
		<div className="input-container">
			<input
				className="input"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<RenderEndDecorator value={value} onChange={setValue} />
		</div>
	);
}

export function Example() {
	return <Input renderEndDecorator={RenderEndDecorator} />;
}

function RenderEndDecorator({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	return value && <ClearButton onClick={() => onChange("")} />;
}

// Now the rendering is optimized
