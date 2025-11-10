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

## How to organize your design system components <br/> without a strong design vision

Thibault Friedrich

<style>

</style>

---

# About me: Thibault Friedrich

- Frontend developer for 12+ years
- Using _React_ for 8+ years and love it
- Strong focus on Ux, Agile and Code craftsmanship
  - how to create usable products
  - how to keep flexibility
  - how to write **Clean Code**
- Implementing design systems for 4 years
- Maintainer of [DesignSystemHub](https://design-system-hub.com) & [Features-cli](https://github.com/interaction-dynamics/features)

<img src="/thibault-friedrich.png" class="absolute right-20 top-20 w-60">

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

# React Patterns volume 2

This presentation is a follow-up of a [previous presentation](https://github.com/friedrith/react-composition).

I will reexplain some patterns but I will skip a part of the story telling.

So I consider you are __convinced__ enough that the code below is generally not a good idea for design system components:

```tsx
if (isFeatureAEnabled()) {
  doFeatureA();
} else {
  doFeatureB();
}
```

::right::

<a href="https://github.com/friedrith/react-composition" target="_blank">
    <img src="/screenshot.png" class="w-full m-10" />
</a>


---
layout: two-cols
---

# What is a design system?

- standards and guidelines
- style guide
- **reusable components**

2 key parts:

<div class="flex items-center space-x-2 w-full text-center mb-10">
    <div class="flex-1 part">
        Design
    </div>
    <div class="flex-1 part">
        Development
    </div>
</div>

Benefits:

- provide consistent user experience
- accelerate development

::right::

<img src="/design-system.jpg" alt="Design System Image" class="ml-8">

---

# In the ideal world

You have a strong design system team:

- designers
- frontend developers
- accessibility experts

They have a vision so when you can build the components with clear variants:

<div class="flex items-center space-x-2 w-full text-center mb-10">
    <div class="flex-1 part">
        Variant 1
    </div>
    <div class="flex-1 part">
        Variant 2
    </div>
    <div class="flex-1 part">
        Variant 3
    </div>
    <div class="flex-1 part">
        Variant 4
    </div>
</div>


__But what happens if you don't have a strong design system team?__

<div class="absolute left-30px bottom-30px">
    <a>https://www.nngroup.com/articles/design-systems-101/</a>
</div>




---

# In the real world

Designers don't have time.

As developers, you are __alone__ to build and maintain the design system.

You must be pragmatic:

1. skip the standards and guidelines.
2. extract the style guide from features mockups.
3. alone to build the component library:
    - Flexible for the future
    - Enforce consistency

---

# Step 1: Reuse an existing library

<div align="center">
<img src="/mui.png" alt="mui" style="height: 100px" />
<br/>
<img src="/shadcn.png" alt="mui" style="height: 100px" />

</div>


__Good starting point__ and a structure for your themes and base components.

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

Find a good balance of flexible and consistency:

- Composition → atoms
- React slots pattern → atoms
- Render prop → atoms
- Prop getter → molecules
- Custom slots and slotProps → organisms
- Context override → organisms

---
layout: cool-demo
url: https://friedrith.github.io/pragmatic-design-system/#/composition?demo=1
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
url: https://friedrith.github.io/pragmatic-design-system/#/react-slots?demo=1
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

More useful for Modals, Card, etc. Similar to Slots in Vue.js

---
layout: cool-demo
url: https://friedrith.github.io/pragmatic-design-system/#/render-component-prop?demo=1
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

<iframe style="width: 100%; height: 300px" src="https://friedrith.github.io/pragmatic-design-system/#/props-getter?demo=1">

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

1. Mui or Shadcn/ui
2. Atomic Design with some Domain Driven sections.
3. React patterns:
    - Composition & React slots for atoms
    - Render prop for molecules
    - Props getter in parallel of atoms and molecules
    - Custom slots and subcomponents for organisms


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
