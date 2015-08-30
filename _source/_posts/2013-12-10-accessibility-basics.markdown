---
title: Accessibility basics
excerpt : A few tips and learnings from working on WCAG 2.0 accessible sites
tags:
- accessibility
- tips
- WCAG 2.0
related: accessible sprites
comments : true
seo__desc : A few tips and learnings from working on WCAG 2.0 accessible sites
seo__key : accessibility, accessible tips, accessibility tips, WCAG, WCAG 2.0, accessible web, low vision, blind, screen reader, screen-reader, high contrast, icon, button
icons : wheelchair
---
There are a lot of misconceptions about making websites accessible, but with some simple thinking you can easily make your site more accessible.
<!-- /intro -->

### Accessibilty is *just* for blind people
This is a pretty large myth about making the web accessible, it still gets thrown around the office a lot. <q>Accessibility is just for blind people, how hard can it be?</q>. Visual impairment does cover a large area of accessibility, think users with low vision; color blindness; screen magnifiers; high-contrast; and screen reader users. Remember to consider dyslexic, keyboard-only, movement impaired and deaf users as well and your site and approach to accessibility[^1] will improve.

### Icons
Icons are great for quick visual communication and call-to-actions, but can quickly become inaccessible. Ask yourself <q>is the action still conveyed if the icon is removed?</q> If the answer is **no**, then there is a high potential for users to completely miss something you intended for them to do.

Sprites and icon-fonts are great for developers, but don't easily make themselves accessible. As a general rule only use an image with `alt text` if the action cannot be done without the icon present.

{% highlight html  %}
<!-- 1 -->
<button><i class="icon-edit"></i></button>

<!-- 2 -->
<button>
  <i class="icon-edit"></i>
  <span class="visuallyhidden">Edit post</span>
</button>

<!-- 3 -->
<button><i class="icon-edit"></i> Edit post</button>
{% endhighlight %}

In the above three buttons:

1. Insta-fail. The button and it's intended action are only known to sighted users. As a trivial note the icon's meaning could also be ambiguous or have a different context to some users or cultures
1. Much better as the icon is accompanied by some helper text available to screen readers. Might even pass WCAG 2.0
3. Awesome! The button has communicated its action to all, with the icon adding to the visual UX

### Read more
Read more...read more what? Ensure links have relevant context by placing them inside `p` tags or  adding hidden text. Most screen readers or browser plugins can pull up all links on a page. Imagine reading <q>read more</q> ten or so times on a home page without any context, how are you meant to know what each link actually does?

{% highlight html  %}
<a href="/about">
  read more
  <span class="visuallyhidden"> about our bawse company</span>
</a>
{% endhighlight %}

That's better, context for our links! Again a tiny bit of markup goes a long way.

### Lazy keyboard-only support
Hands down the simplest thing to add to your site is `:focus` states. My lazy-no-design-needed rule is make the focus state the same as the hover state.

I have a [snippet in sublime](https://github.com/Piderman/sublime__settings/blob/master/User/Sass/hover-focus.sublime-snippet) that triggers on <q>hocus</q>, outputting both `:hover` and `:focus` selectors for me like so, you will never need to think of focus states again.

{% highlight scss  %}
&:hover,
&:focus {
  // state change
}
{% endhighlight %}

The above assumes I am already nested with an `a, button` or `input` selector and adds so much visual clarity to the site that keyboard-only users should never have any doubt on what link they are on again.

### Buttons
A pet hate of mine is a link with no location that's hooked up to a javascript event like so `<a href="#"/>`. Even worse is `<span onclick="toggle(this)"/>`, the 90's called and they want their dialups back. While it can be made accessible, a lot of the time it's simply the wrong element used for the wrong purpose. A better way to think of interactivity is:

* if the action **navigates** to a new page, it should be a **link**
* if the action **finalises** something, it should be a **submit button**
* if the action **triggers a javascript event** it should be a **button**

Buttons (`<button> button text </button>`, not `<input type="button"/>`) are fantastic for client side events and a fairly overlooked element when it comes to accessibility. They natively offer:

* event actions such as hover, focus and click
* tab focus
* space, enter or click presses
* nested HTML
* pseudo elements

I will always use buttons, mostly creating them in javascript, for things like tabs or toggles on the same page. So don't use a `div` with a click handler, just use a button!

#### Postback support
{% highlight javascript  %}
$("<button>", {
  text: "toggle"
}).on("click", function(event) {
  if (event) event.preventDefault();

  // remaining logic
});
{% endhighlight %}

The above comes in handy for creating a <del>javascript</del> <ins>jQuery</ins> button. It stops things like postbacks to servers being triggered or any other user-agent events hooked up, as well as allowing `.trigger()` to be called elsewhere on the object without causing errors.

### Semantics
HTML is meant to describe text, so use it for its intended use! Screen readers have some cool features such as telling you how long a list is, or the ability to skip to headings on the page. [A wise man](http://twitter.com/DanielOgden) once taught me that structure comes first, then the visual styles. Removing the CSS from a page should still make it readable.


## Conclusion
If you can keep in mind these small steps then accessibility can become second nature and part of good development practices. Treat having both hover and focus states the same as a background-color fallback for a gradient, and your sites will be instantly more accessible.

[^1]: I have written the word <q>accessibility</q>, and its variants, more than 20 times in this post, yet managed to spell it wrong every. single. time.
