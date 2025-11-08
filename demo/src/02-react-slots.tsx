import { EnvelopeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Children } from "react";

export const title = "React Slots";

interface InputProps {
	children: React.ReactNode;
}

const hasType = (child: React.ReactNode): child is React.ReactElement => {
	return typeof child === "object" && child !== null && "type" in child;
};

// Sometimes you want to provide multiple children to a component.

export function Input({ children }: InputProps) {
	const startDecorator = Children.toArray(children).find(
		(child) => hasType(child) && child.type === InputStartDecorator,
	);
	const endDecorator = Children.toArray(children).find(
		(child) => hasType(child) && child.type === InputEndDecorator,
	);

	return (
		<div className="input-container">
			{startDecorator}
			<input className="input" />
			{endDecorator}
		</div>
	);
}

export function Example() {
	return (
		<Input>
			<InputStartDecorator>
				<EnvelopeIcon className="h-8 w-8" />
			</InputStartDecorator>
			<InputEndDecorator>
				<button className="button" type="button">
					<XCircleIcon className="h-8 w-8" />
				</button>
			</InputEndDecorator>
		</Input>
	);
}

function InputStartDecorator({ children }: { children: React.ReactNode }) {
	return <div className="start-decorator">{children}</div>;
}

function InputEndDecorator({ children }: { children: React.ReactNode }) {
	return <div className="end-decorator">{children}</div>;
}

// Give more flexibility to render multiple named children but sometimes complex to understand so should be limited to composition renderings. Sometimes it is better to use properties
