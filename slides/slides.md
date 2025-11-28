---
# You can also start simply with 'default'
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: /background.png
# some information about your slides (markdown enabled)
title: Pragmatic Design System
info: |
  How to organize your design system components without a strong design vision
  Learn more at [Pragmatic Design System](https://github.com/friedrith/pragmatic-design-system)
# apply unocss classes to the current slide
colorSchema: light
layout: cover
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-up
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Pragmatic Design System

## Structuring your Design System without Designers

<strong style="color: black">Thibault Friedrich</strong>

<style>

</style>

---

# About me: Thibault Friedrich

- Frontend developer for __12+ years__
- Using __React__ for 8+ years and love it
- Strong focus on Ux, Agile and Code craftsmanship
  - how to create usable products
  - how to keep flexibility
  - how to write **Clean Code**
- Implementing design systems for 4 years
- Maintainer of [DesignSystemHub](https://design-system-hub.com) & [Features-cli](https://github.com/interaction-dynamics/features)

<img src="/thibault-friedrich.png" class="absolute right-20 top-20 w-60 rounded-md">

<div class="abs-bl m-6 flex gap-2">
  <!-- <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button> -->
  <a href="https://www.linkedin.com/in/thibault-friedrich/" target="_blank" alt="Linkedin"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-black">
    <carbon-logo-linkedin />
  </a>
  <a href="https://github.com/friedrith" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-black">
    <carbon-logo-github />
  </a>
  <a href="https://medium.com/@thibault-friedrich" target="_blank" alt="Medium"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-black">
    <carbon-logo-medium />
  </a>
</div>

---
layout: two-cols
---

# What is a design system?

- standards and guidelines
- style guide
- **reusable components**

Benefits:

- provide consistent user experience
- accelerate development

<div v-click class="pt-8">

<strong align="center" style="font-size: 2rem;" class="legendary block pb-2">
    2 Parts
</strong>

<div class="flex items-center space-x-2 w-full text-center mb-10">
    <div class="flex-1 part">
        Design
    </div>
    <div class="flex-1 part">
        Development
    </div>
</div>

</div>

::right::

<img src="/design-system.jpg" alt="Design System Image" class="ml-8">

---

# In the ideal world

You have a strong design system team:

- designers
- frontend developers
- accessibility experts

They have a vision so the components may be defined with clear variants: `default`, `admin`, `disabled`

<div className="flex justify-center">
<img src="/components.png" alt="4 variants of a components" style="max-height: 250px;">
</div>

---

# In the real world

Sometimes, you don't have designers to maintain the design system. As developers, you are __alone__.

You must be __pragmatic__:

<ul>
    <li><span v-mark.strike-through="{color: '#AE4FCE'}">standards and guidelines</span><strong v-click="1"> → Skip</strong></li>
    <li><span v-mark.strike-through="{color: '#AE4FCE'}">style guide</span><strong v-click="2"> → Extract the style from the features mockups</strong></li>
    <li>reusable components<strong v-click="3"> → Use patterns to enforce flexibility but consistency</strong></li>
</ul>

---

# Step 1: Reuse an existing library

<div align="center">
<img src="/mui.png" alt="mui" style="height: 100px" />
<br/>
<img src="/shadcn.png" alt="mui" style="height: 100px" />

</div>


__Good starting point__: a structure for your themes and base components.

> If your company is larger, you may consider __Ant Design__ or __Tailwind__.

---
layout: two-cols
---

# Atomic Design

- atoms
- molecules
- organisms
- templates
- pages

Cool in theory.

But a Design system is not a **one-size-fits-all** solution.

It must be adapted to your needs and your domain.

::right::

<img src="/atomic-design.png" alt="Atomic Design" class="w-[90%] mx-10" />


---

# Step 2: Pragmatic Atomic Design

- May be domain specific (payment summary for example)
- May include logic (error management for example)
- Need to support your request of balance flexibility/consistency

<div v-click>

For example:


| Type | Domain Specific | Business Logic | Infinite Variants |
|----------|------------------|-------|---------------------------|
| Atoms | ✗ | ✗ | ✓ |
| Molecules | ✓ | ✗ | ✓ |
| Organisms | ✓ | ✓ | ✓ (but with a default variant) |


<div class="absolute left-30px bottom-30px">
    Honorable mentions: templates, pages, providers.
</div>

</div>

---

# Step 3: React Patterns

Find the React Patterns to support a good balance between flexibility and consistency:


- __atoms__: UI & primitive components, very flexible
  - Composition
  - React slots pattern
  - Render prop
  
<div v-click>  
  
- __molecules__: UI domain specific components but without business logic
  - Prop getter
  
</div>

<div v-click>

- __organisms__: components with consistent business logic
  - Custom slots and slotProps
  - Context override

</div>

---
layout: cool-demo
url: http://localhost:5173/#/composition?demo=1
---

# Composition

Like `children`, but works for any property:

```tsx
function Example() {
	return (
		<>
			<Input endDecorator={<ClearButton />} />
			<Input endDecorator={<CheckIndicator />} />
		</>
	);
}

function Input({ endDecorator }) {
	return (
		<div className="input-container">
			<input className="input" />
			{endDecorator}
		</div>
	);
}
```


<strong style="display: block" v-click>Pros: easy to use, high level of flexibility.</strong>
<strong style="display: block" v-click>Cons: no easy interaction between parent and child</strong>

---
layout: cool-demo
url:  http://localhost:5173/#/react-slots?demo=1
---

# React Slots pattern

Smart composition leveraging `children`.

```tsx
function Example() {
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

function Input({ children }: InputProps) {
 	const startDecorator = Children.toArray(children).find(
		(child) => child.type === InputStartDecorator,
	);
	const endDecorator = Children.toArray(children).find(
		(child) => child.type === InputEndDecorator,
	);

	return (
		<div className="input-container">
			{startDecorator}
			<input className="input" />
			{endDecorator}
		</div>
	);
}
```

Very adapted for Modals, Card, etc. Similar to Slots in Vue.js

<style>
.slidev-code {
  overflow: auto;
  max-height: 25vh!important;
}
</style>

---
layout: cool-demo
url:  http://localhost:5173/#/render-component-prop?demo=1
---

# Render Prop

Sometimes composition is not enough:

```tsx
export function Example() {
	return <Input renderEndDecorator={RenderEndDecorator}/>;
}

export function Input({ renderEndDecorator: RenderEndDecorator }) {
	const [value, setValue] = useState("");

	return (
		<div className="input-container">
			<input
				className="input"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<RenderEndDecorator value={value} onChange={setValue} />
		</div>
	);
}
```

<strong style="display:block" v-click>Pros: function or component, interaction, flexibility</strong>
<strong style="display:block" v-click>Cons: works for JSX, not for behaviours</strong>

---

# Inversion of Control

- Composition
- React Slots
- Render Prop

We removed the logic from the **atoms** and **molecules** to keep the components generic using inversion of control (SOLID).

Now the logic is controlled by the parent component.

But sometimes we want to make this logic reusable too.

---
layout: cool-demo
url: http://localhost:5173/#/props-getter?demo=1
---

# Prop Getter

```tsx
function Example() {
	const { getCreditCardInputProps } = useCreditCardProps();

	return <Input {...getCreditCardInputProps()} />;
}

function useCreditCardProps() {
	const [value, setValue] = useState("");
	const onChangeCreditCardNumbers = //...

	return {
		getCreditCardInputProps: () => ({
			value,
			onChange: onChangeCreditCardNumbers,
			endDecorator: value.length === 19 ? <CheckIndicator /> : null,
		}),
	};
}

```

<strong style="display:block" v-click>Pros: flexibility</strong>
<strong style="display:block" v-click>Cons: maintainability, inconsistency when used too much</strong>

<div class="absolute right-30px bottom-10px z-50">
    <a href="https://www.epicreact.dev/workshops/advanced-react-patterns/prop-getters">Advanced React Patterns by Kent C. Dodds</a>
</div>

---
layout: cool-demo
url: http://localhost:5173/#/organism?demo=1
---

# Organism Paradigm

Atoms & Molecules: __genericity__ using composition

But you cannot keep the same paradigm for all your components.

A lot of code duplication. Hard to maintain the consistency.

Organisms: One default variant but with <strong class="legendary">customizable</strong> endpoints.

```tsx
<Calendar
	date={selected}
	onDateChange={setSelected}
/>
```

---
layout: cool-demo
url: http://localhost:5173/#/custom-slots?demo=1
---

# Custom Slots

```tsx{|4-8}
<Calendar
	date={selected}
	onDateChange={setSelected}
	slotProps={{
		actionBar: { // <-- customizable endpoint
		  actions: ["today", "clear"] } // <-- overridden properties
	  }
	}
/>
```

<div className="absolute right-5 top-27 z-50 w-[280px] text-center">
    <div class="h-10" v-mark="{ at: 1, color: 'orange', type: 'circle' }">
    </div>
</div>

Inspired from [Mui X](https://mui.com/x/react-date-pickers/custom-components/).


<strong style="display:block" v-click>Pros: targeted customization, overrides default variant</strong>
<strong style="display:block" v-click>Cons: heavy if too many customizations, very hard to override deep children</strong>

---
layout: cool-demo
url: http://localhost:5173/#/custom-subcomponents?demo=1
---

# Custom Subcomponents

```tsx
function Example() {
	const [selected, setSelected] = useState<Date>();
	return (
		<Calendar
			date={selected}
			onDateChange={setSelected}
			slots={{ actionBar: CustomActionBar }} // <-- we override
		/>
	);
}

function CustomActionBar() {
	return (
		<div className="flex items-center gap-3 justify-between">
			{actions.map((action) => (
				<button key={action} onClick={() => onAction(action)}>
					{action === "clear" ? "X" : action}
				</button>
			))}
		</div>
	);
}

```

You can override whole components.

---

# Subcomponents Context Override

Sometime props drilling is a pain.

```tsx
<SlotsOverrideProvider slots={{actionBar: CustomActionBar}}>
  <Page />
</SlotsOverrideProvider>
```

Very useful to apply specific behaviour or UI to a whole sub product (admin panel, specific client).

<strong style="display:block" v-click>Pros: You can override deep components</strong>
<strong style="display:block" v-click>Cons: Cannot target a specific component, example: 2 actionBars</strong>


---

# Conclusion

**Maintaining a design system is hard without designers. Require good architectural choices.**

1. Mui or Shadcn/ui
2. Atomic Design with some Domain Driven sections.
3. React patterns:
    - Composition & React slots for atoms
    - Render prop for molecules
    - Props getter in parallel of atoms and molecules
    - Custom slots, subcomponents and context override for organisms


Of course, implementing a good design system requires much more and some other topics like documentation, testing, accessibility.

---
layout: two-cols
---

# Questions ?

<div class="h-30"></div>

# Stay in contact


- [thibaultfriedrich.io](https://thibaultfriedrich.io)
- [github.com/friedrith/pragmatic-design-system](https://github.com/friedrith/pragmatic-design-system)

::right::

<div class="text-center flex flex-col items-center">

<img src="/qr-code.svg" class="h-60 w-60" alt="repository" />

Repository

</div>
