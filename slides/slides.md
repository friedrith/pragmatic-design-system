---
# You can also start simply with 'default'
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Pragmatic Design System
info: |
  How to organize your design system components without a strong design vision
  Learn more at [Pragmatic Design System](https://github.com/friedrith/pragmatic-design-system)
# apply unocss classes to the current slide
class: text-center
colorSchema: light
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-up
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Pragmatic Design System

## How to organize your design system components without a strong design vision

Thibault Friedrich

---

# Introducing myself: Thibault Friedrich

- Frontend developer for 12+ years
- Using _React_ for 8+ years and love it
- Strong focus on Ux, Agile and Code craftsmanship
  - how to create usable products
  - how to keep flexibility
  - how to write **Clean Code**
- Implementing design systems for 4 years
- Maintainer of [DesignSystemHub](https://design-system-hub.com) & [Features-cli](https://github.com/interaction-dynamics/features)

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

# Follow-up presentation

This presentation is a follow-up of a [previous presentation](https://github.com/friedrith/react-composition).

I will reexplain some patterns but I will skip a part of the story telling.

So I consider you are convinced enough that you understand why it is important to not have this code in your design system components:

```tsx
if (isFeatureAEnabled()) {
  doFeatureA();
} else {
  doFeatureB();
}
```

---

# What is a design system?

- standards and guidelines
- style guide
- **reusable components**

This design system has 2 parts:

- **Design**
- **Development**

It is very helpful when you want to have a consistent user experience. It also helps developers to build features faster.

In small companies, you use an existing design system. But in larger organizations you build your own design system because you have specific needs (on the top of an existing one).

---

# In the ideal world

You have a strong design system team that can create a strong design system.

They have a vision so when you build the components, you know what they should include.

A design system team includes:

- designers
- frontend developers
- accessibility experts

But what happens if you don't have a strong design system team?

---

# For example

Multiple variants of the same component.

---


# In the real world

You have only few designers in your company and only design mockups for the incoming features.

As developers, you have to build the design system yourself.

1. skip the standards and guidelines.
2. extract the style guide from features mockups.
3. alone for the components strategy:
    - Flexible for the future
    - Enforce consistency

**That's a pragmatic design system.**

→ Baby steps

---

# Step 1: Reuse an existing library

<div align="center">
<img src="/mui.png" alt="mui" style="height: 100px" />
<br/>
<img src="/shadcn.png" alt="mui" style="height: 100px" />

</div>


It will give a good starting point and a structure for your themes and some base components.

If your company is larger, you can consider Ant Design or tailwind.

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

---

# Step 2: Pragmatic Atomic Design

For example:


| Type | Domain Specific | Business Logic | Infinite Variants |
|----------|------------------|-------|---------------------------|
| Atoms | ✗ | ✗ | ✓ |
| Molecules | ✓ | ✗ | ✓ |
| Organisms | ✓ | ✓ | ✗ (but customizable) |


__The important is to keep them separate.__

<div class="absolute left-30px bottom-30px">
    Honorable mentions: templates, pages, providers.
</div>


---

# Step 3: React Patterns

Today we will focus on the React patterns to make your design system components reusable, flexible but not too much.

- Composition → atoms
- React slots pattern → atoms
- Render prop → atoms
- Prop getter → molecules
- Custom slots and slotProps → organisms
- Context override → organisms

---
layout: cool-demo
url: http://localhost:5173/#/composition?demo=1
---

# Composition

Like `children`, but works for any property:

```tsx
function Input({ endDecorator }) {
	return (
		<div className="input-container">
			<input className="input" />
			{endDecorator}
		</div>
	);
}

function Example() {
	return (
		<>
			<Input endDecorator={<ClearButton />} />
			<Input endDecorator={<CheckIndicator />} />
		</>
	);
}
```

---
layout: cool-demo
url: http://localhost:5173/#/react-slots?demo=1
---

# React Slots pattern

Smart composition leveraging `children`.

```tsx
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
```

More useful for Modals, Card, etc.

---
layout: cool-demo
url: http://localhost:5173/#/render-component-prop?demo=1
---

# Render Prop

Sometimes composition is not enough:

```tsx
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

export function Example() {
	return <Input renderEndDecorator={RenderEndDecorator}/>;
}
```

It gives more interaction between the components

---

# Inversion of Control

- Composition
- React Slots
- Render Props

We removed the logic from the **atoms** to keep them generic using inversion of control (SOLID)

Now the logic is controlled by the parent component.

But sometimes we want to make this logic reusable too.

---

# Prop Getter

```tsx
function Example() {
	const { getCreditCardInputProps } = useCreditCardProps();

	return <Input {...getCreditCardInputProps()} />;
}
```

<iframe style="width: 100%; height: 300px" src="http://localhost:5173/#/props-getter?demo=1">

</iframe>


<div class="absolute left-30px bottom-30px">
    <a href="https://www.epicreact.dev/workshops/advanced-react-patterns/prop-getters">Advanced React Patterns by Kent C. Dodds</a>
</div>

---

# Atoms & Molecules != Organisms

With the 4 patterns, you cover all the needs for the atoms and molecules.

Remain generic

Give a lot of flexibility

But by experience, you cannot keep the same logic for all your components.

A lot of code duplication. Inconsistency.


---

# Custom Slots

Inspired from [Mui X](https://mui.com/x/react-date-pickers/custom-components/).

Organisms: One variant but all the subcomponents are customizable

```tsx
<DatePicker
  slotProps={{
    // The actions will be the same between desktop and mobile
    actionBar: {
      actions: ['clear'],
    },
  }}
/>



```


---

# Custom Subcomponents

```tsx
<DatePicker
  slots={{
    actionBar: CustomActionBar,
  }}
/>


```

---

# Conclusion

**Maintaining a design system is hard without designers. Require good architectural choices.**

1. Library
2. Atomic Design with some Domain Driven sections.
3. React patterns:
    - Composition & React slots for atoms
    - Render prop for molecules
    - Props getter in parallel of atoms and molecules
    - Custom slots and subcomponents for organisms

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
