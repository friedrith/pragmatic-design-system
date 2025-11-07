import "./App.css";
import { HashRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import * as Composition from "./01-composition";
import * as RenderFunctionProps from "./02-render-function-props";
import * as RenderComponentProps from "./03-render-component-props";
import * as RenderPropsHook from "./04-render-props-hook";
import * as ReactSlotsPatterns from "./05-react-slots-patterns";
import { getPageUrl } from "./utils/get-page-url";
import { Layout } from "./utils/Layout";
import { Page } from "./utils/Page";

const routes = [
	Composition,
	RenderFunctionProps,
	RenderComponentProps,
	RenderPropsHook,
	ReactSlotsPatterns,
];

function App() {
	return (
		<div className="app">
			<HashRouter>
				<Page routes={routes.map((r) => r.title)}>
					<Routes>
						{routes.map(({ title, Example }) => (
							<Route
								key={title}
								path={getPageUrl(title)}
								element={<Layout title={title} component={Example} />}
							/>
						))}
						<Route
							path="*"
							element={
								<Navigate to={getPageUrl(routes[0].title)} replace={true} />
							}
						/>
					</Routes>
				</Page>
			</HashRouter>
		</div>
	);
}

export default App;
