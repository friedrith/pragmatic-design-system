import { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { SlotProps } from "./utils/slots";
import "react-day-picker/style.css";

export const title = "Organism";

type EndPoints = {
	actionBar: typeof CalendarActionBar;
};

interface PaymentFormProps {
	date: Date | undefined;
	onDateChange: (date: Date | undefined) => void;
	slotProps?: SlotProps<EndPoints>;
}

export function Calendar({ date, onDateChange, slotProps }: PaymentFormProps) {
	return (
		<div className="calendar">
			<CalendarActionBar
				actions={["clear"]}
				onAction={() => onDateChange(undefined)}
				{...slotProps?.actionBar}
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

	return <Calendar date={selected} onDateChange={setSelected} />;
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
