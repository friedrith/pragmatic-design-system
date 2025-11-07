import "./App.css";
import * as Composition from "./01-composition";
import * as RenderFunctionProps from "./02-render-function-props";
import * as RenderComponentProps from "./03-render-component-props";
import * as RenderPropsHook from "./04-render-props-hook";
import * as ReactSlotsPatterns from "./05-react-slots-patterns";

const examples = [
	Composition,
	RenderFunctionProps,
	RenderComponentProps,
	RenderPropsHook,
	ReactSlotsPatterns,
];

function App() {
	return (
		<div className="neumorphism">
			<h1>Pragmatic Design System</h1>
			<div className="flex flex-col gap-10 items-center">
				{examples.map((example) => (
					<div key={example.title}>
						<h2>{example.title}</h2>
						<example.Example />
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
