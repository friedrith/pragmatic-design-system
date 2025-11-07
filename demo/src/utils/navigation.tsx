import { Link, useLocation } from "react-router-dom";
import { getPageUrl } from "./get-page-url";

interface NavigationProps {
	pageTitles: string[];
}

export function Navigation({ pageTitles }: NavigationProps) {
	const location = useLocation();

	return (
		<div className="absolute inset-y-0 right-5 flex items-center">
			<div className="flex flex-col gap-2 pl-4">
				{pageTitles.map((page) => (
					<Link
						key={page}
						className={`navigation-button w-5 h-5 rounded-full ${
							location.pathname === getPageUrl(page) ? "active" : ""
						}`}
						to={getPageUrl(page)}
					/>
				))}
			</div>
		</div>
	);
}
