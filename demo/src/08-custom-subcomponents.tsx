import { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { Slots } from "./utils/slots";
import "react-day-picker/style.css";

export const title = "Custom Subcomponents";

type EndPoints = {
	actionBar: typeof CalendarActionBar;
};

interface PaymentFormProps {
	date: Date | undefined;
	onDateChange: (date: Date | undefined) => void;
	slots?: Slots<EndPoints>;
}

export function Calendar({ date, onDateChange, slots }: PaymentFormProps) {
	const ActionBar = slots?.actionBar || CalendarActionBar;

	return (
		<div className="calendar">
			<ActionBar
				actions={["today", "clear"]}
				onAction={(action) =>
					action === "clear"
						? onDateChange(undefined)
						: onDateChange(new Date())
				}
			/>
			<DayPicker
				animate
				required
				mode="single"
				selected={date}
				onSelect={onDateChange}
				footer={date ? `Selected: ${date.toLocaleDateString()}` : "Pick a day."}
			/>
		</div>
	);
}

export function Example() {
	const [selected, setSelected] = useState<Date>();

	return (
		<Calendar
			date={selected}
			onDateChange={setSelected}
			slots={{ actionBar: CustomActionBar }}
		/>
	);
}

function CustomActionBar({ actions, onAction }: CalendarActionBarProps) {
	return (
		<div className="flex items-center gap-3 justify-between">
			{actions.map((action) => (
				<button type="button" key={action} onClick={() => onAction(action)}>
					{action === "clear" ? "X" : action}
				</button>
			))}
		</div>
	);
}

// Atoms

interface CalendarActionBarProps {
	actions: Array<"clear" | "today">;
	onAction: (action: "clear" | "today") => void;
}

function CalendarActionBar({ actions, onAction }: CalendarActionBarProps) {
	return (
		<div className="flex items-center gap-3 justify-between">
			{actions.map((action) => (
				<button type="button" key={action} onClick={() => onAction(action)}>
					{action}
				</button>
			))}
		</div>
	);
}
