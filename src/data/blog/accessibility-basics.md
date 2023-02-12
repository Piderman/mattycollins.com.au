---
title: Accessibility basics
date: 2022-12-21
category: accessibility
---

There are a lot of misconceptions about making websites accessible, but with some simple thinking you can easily make your site more accessible.

### Accessibilty is _just_ for blind people

This is a pretty large myth about making the web accessible, it still gets thrown around the office a lot. <q>Accessibility is just for blind people, how hard can it be?</q>. Visual impairment does cover a large area of accessibility, think users with low vision; color blindness; screen magnifiers; high-contrast; and screen reader users. Remember to consider dyslexic, keyboard-only, movement impaired and deaf users as well and your site and approach to accessibility[^1] will improve.

### Icons

Icons are great for quick visual communication and call-to-actions, but can quickly become inaccessible. Ask yourself <q>is the action still conveyed if the icon is removed?</q> If the answer is **no**, then there is a high potential for users to completely miss something you intended for them to do.

Sprites and icon-fonts are great for developers, but don't easily make themselves accessible. As a general rule only use an image with `alt text` if the action cannot be done without the icon present.

```html
<!-- 1 -->
<button><i class="icon-edit"></i></button>

<!-- 2 -->
<button>
	<i class="icon-edit"></i>
	<span class="visuallyhidden">Edit post</span>
</button>

<!-- 3 -->
<button><i class="icon-edit"></i> Edit post</button>
```

1. Insta-fail. The button and it's intended action are only known to sighted users. As a trivial note the icon's meaning could also be ambiguous or have a different context to some users or cultures
1. Much better as the icon is accompanied by some helper text available to screen readers. Might even pass WCAG 2.0
1. Awesome! The button has communicated its action to all, with the icon adding to the visual UX

### Read more

Read more...read more what? Ensure links have relevant context by placing them inside `p` tags or adding hidden text. Most screen readers or browser plugins can pull up all links on a page. Imagine reading <q>read more</q> ten or so times on a home page without any context, how are you meant to know what each link actually does?

```html
<a href="/about">
	read more
	<span class="sr-only"> about [article headline]</span>
</a>
```

That's better, context for our links! Again a tiny bit of markup goes a long way.

### Lazy keyboard-only support

Hands down the simplest thing to add to your site is `:focus` states. My lazy-no-design-needed rule is make the focus state the same as the hover state.

```css
&:hover,
&:focus {
	// state change
}
```

The above assumes I am already nested with an `a, button` or `input` selector and adds so much visual clarity to the site that keyboard-only users should never have any doubt on what link they are on again.

### Buttons

A pet hate of mine is a link with no location that's hooked up to a javascript event like so `<a href="#"/>`. Even worse is `<span onclick="toggle(this)"/>`, the 90's called and they want their dialups back. While it can be made accessible, a lot of the time it's simply the wrong element used for the wrong purpose. A better way to think of interactivity is:

- if the action **navigates** to a new page, it should be a **link**
- if the action **finalises** something, it should be a **submit button**
- if the action **triggers a javascript event** it should be a **button**

Buttons (`<button> button text </button>`, not `<input type="button"/>`) are fantastic for client side events and a fairly overlooked element when it comes to accessibility. They natively offer:

- event actions such as hover, focus and click
- tab focus
- space, enter or click presses
- nested HTML
- pseudo elements
