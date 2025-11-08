import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import * as Composition from "./01-composition";
import * as ReactSlots from "./02-react-slots";
import * as RenderFunctionProp from "./03-render-function-prop";
import * as RenderComponentProp from "./04-render-component-prop";
import * as PropsGetter from "./05-props-getter";
import * as CustomSlotsProps from "./06-custom-slots-props";
import { getPageUrl } from "./utils/get-page-url";
import { Layout } from "./utils/Layout";
import { Page } from "./utils/Page";

const routes = [
	Composition,
	ReactSlots,
	RenderFunctionProp,
	RenderComponentProp,
	PropsGetter,
	CustomSlotsProps,
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
