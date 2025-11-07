import { useState } from "react";

export const title = "Custom Slots Props";

type EndPoints = {};

interface InputProps {
	value: string;
	onChange: (value: string) => void;
}

// Sometimes it is not about rendering something different, but about controlling the behavior of a component.

export function Input({ value, onChange }: InputProps) {
	return (
		<div className="input-container">
			<input
				className="input"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}

export function NaiveExample() {
	const [value, setValue] = useState("");

	const onChangeCreditCardNumbers = (value: string) => {
		setValue(
			value
				.replace(/[^0-9]/g, "")
				.replace(/(.{4})/g, "$1 ")
				.trim(),
		);
	};

	return <Input value={value} onChange={onChangeCreditCardNumbers} />;
}

// ⬆️ It may bring code duplication and features spreading

export function Example() {
	const { getCreditCardInputProps } = useCreditCardProps();

	return <Input {...getCreditCardInputProps()} />;
}

function useCreditCardProps() {
	const [value, setValue] = useState("");

	const onChangeCreditCardNumbers = (value: string) => {
		setValue(
			value
				.replace(/[^0-9]/g, "")
				.replace(/(.{4})/g, "$1 ")
				.trim()
				.slice(0, 19),
		);
	};

	return {
		getCreditCardInputProps: () => ({
			value,
			onChange: onChangeCreditCardNumbers,
		}),
	};
}
