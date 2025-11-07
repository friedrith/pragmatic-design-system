import { useSearchParams } from "react-router-dom";
import { Footer } from "./footer";
import { Github } from "./github";
import { Navigation } from "./navigation";

interface PageProps {
	children: React.ReactNode;
	routes: string[];
}

export function Page({ children, routes }: PageProps) {
	console.log("routes", routes);
	const [urlSearchParams] = useSearchParams();

	if (urlSearchParams.get("demo")) return <>{children}</>;

	return (
		<>
			<Navigation pageTitles={routes} />
			<Github />
			{children}
			<Footer />
		</>
	);
}
