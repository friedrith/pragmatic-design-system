import { useState } from "react";
import { CheckIndicator } from "./utils/check-indicator";
import { CreditCardIndicator } from "./utils/credit-card-indicator";
import { CvvIndicator } from "./utils/cvv-indicator";
import { ErrorIndicator } from "./utils/error-indicator";
import { ExpirationDateIndicator } from "./utils/expiration-date-indicator";
import type { SlotProps } from "./utils/slots";

export const title = "Custom Slots Props";

type EndPoints = {
	creditCardInput: typeof Input;
	cvvInput: typeof Input;
	expirationDateInput: typeof Input;
};

interface PaymentFormProps {
	onSubmit?: ({
		creditCardNumber,
		cvv,
		expirationDate,
	}: {
		creditCardNumber: string;
		cvv: string;
		expirationDate: string;
	}) => void;
	slotProps?: SlotProps<EndPoints>;
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
	const { getCreditCardInputProps, creditCardNumber } =
		useCreditCardNumberProps();

	const { getCvvInputProps, cvv } = useCvvProps();

	const { getExpirationDateInputProps, expirationDate } =
		useExpirationDateProps();

	return (
		<form
			className="grid grid-cols-2 gap-3 max-w-[400px]"
			onSubmit={() => onSubmit?.({ creditCardNumber, cvv, expirationDate })}
		>
			<Input
				className="col-span-2 w-auto"
				startDecorator={<CreditCardIndicator />}
				{...getCreditCardInputProps()}
			/>
			<Input startDecorator={<CvvIndicator />} {...getCvvInputProps()} />
			<Input
				startDecorator={<ExpirationDateIndicator />}
				{...getExpirationDateInputProps()}
			/>
		</form>
	);
}

export function Example() {
	return <PaymentForm />;
}

// Atoms

interface InputProps {
	className?: string;
	value: string;
	onChange: (value: string) => void;
	startDecorator?: React.ReactNode;
	endDecorator?: React.ReactNode;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

function Input({
	className = "",
	value,
	onChange,
	inputProps,
	startDecorator,
	endDecorator,
}: InputProps) {
	return (
		<div className={`input-container w-auto ${className}`}>
			{startDecorator && (
				<div className="start-decorator">{startDecorator}</div>
			)}
			<input
				className="input"
				{...inputProps}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{endDecorator}
		</div>
	);
}

function useCreditCardNumberProps() {
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
			inputProps: {
				autoComplete: "cc-number",
				autoCorrect: "off",
				autoCapitalize: "off",
				pattern: "[0-9 ]{16}",
				placeholder: "1234 5678 9012 3456",
				inputmode: "numeric",
				type: "text",
			},
			endDecorator: value.length === 19 ? <CheckIndicator /> : null,
		}),
		creditCardNumber: value,
	};
}

function useCvvProps() {
	const [value, setValue] = useState("");

	const onChangeCvv = (value: string) => {
		setValue(
			value
				.replace(/[^0-9]/g, "")
				.replace(/(.{3})/g, "$1 ")
				.trim()
				.slice(0, 3),
		);
	};

	return {
		getCvvInputProps: () => ({
			value,
			onChange: onChangeCvv,
			inputProps: {
				autoComplete: "cc-csc",
				autoCorrect: "off",
				autoCapitalize: "off",
				pattern: "[0-9 ]{3}",
				placeholder: "CVV",
				inputmode: "numeric",
				type: "text",
			},
			endDecorator: value.length === 3 ? <CheckIndicator /> : null,
		}),
		cvv: value,
	};
}

function useExpirationDateProps() {
	const [value, setValue] = useState("");

	const onChangeExpirationDate = (value: string) => {
		setValue(
			value
				.replace(/[^0-9]/g, "")
				.replace(/(.{2})/g, "$1 / ")
				.slice(0, 7),
		);
	};

	const [month, year] = value.split(" / ").map(Number);

	const currentYear = new Date().getFullYear();
	const lastTwoDigits = currentYear.toString().slice(-2);

	return {
		getExpirationDateInputProps: () => ({
			value,
			onChange: onChangeExpirationDate,
			inputProps: {
				autoComplete: "cc-exp",
				autoCorrect: "off",
				autoCapitalize: "off",
				pattern: "[0-9 /]{5}",
				placeholder: "MM / YY",
				inputmode: "numeric",
				type: "text",
			},
			endDecorator:
				value.length === 7 ? (
					month > 0 && month <= 12 && year > Number(lastTwoDigits) ? (
						<CheckIndicator />
					) : (
						<ErrorIndicator />
					)
				) : null,
		}),
		expirationDate: value,
	};
}
