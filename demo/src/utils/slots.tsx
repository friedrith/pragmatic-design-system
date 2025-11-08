export type SlotProps<T extends Record<string, React.FunctionComponent<any>>> =
	{
		[P in keyof T]?: Partial<React.ComponentProps<T[P]>>;
	};

export type Slots<T extends Record<string, React.FunctionComponent<any>>> = {
	[P in keyof T]?: T[P];
};
