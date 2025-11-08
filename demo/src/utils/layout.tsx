import { useSearchParams } from "react-router-dom";

interface LayoutProps {
	title: string;
	component: React.FC;
}

export function Layout({ title, component: Component }: LayoutProps) {
	const [searchParams] = useSearchParams();

	return (
		<div className="p-5">
			{searchParams.get("demo") !== "1" && (
				<h1 className="pb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					{title}
				</h1>
			)}
			<div className="flex flex-col space-y-6 items-center">
				<Component />
			</div>
		</div>
	);
}
