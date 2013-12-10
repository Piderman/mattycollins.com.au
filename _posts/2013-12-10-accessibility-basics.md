---
layout : default
title: Accessibility basics
excerpt : A few tips and learnings from working on WCAG sites
comments : true
seo__desc : seo_description
seo__key : seo_keyword, search_engine_keywords
published: false
---
There are a lot of misconceptions about making websites accessible, but with some simple thinking you can easily make your site more accessible.
<!-- /intro -->

### Accessibilty is *just* for blind people
This is a pretty large myth about making the web accessible, it still gets thrown around the office a lot. <q>Accessibility is just for blind people, how hard can it be?</q>. Blindness does cover a large area of accessibility, think users with low vision; color blindness; screen magnifiers; high-contrast; and screen reader users. But consider dyslexic, keyboard only and deaf users as well.  

### Icons
Icons are great for quick visual communication and call-to-actions, but can quickly become inaccessible. Ask yourself <q>is the action still conveyed if the icon is removed?</q> If the answer is **no**, then there is a high potential for users to completely miss something you intended for them to do.

Sprites and icon-fonts are great for developers, but don't easily make themselves accessible. As a general rule only use an image with `alt text` if the action cannot be done without the icon present.


<button><i class="icon-edit"> </i> </button> 
<button><i class="icon-edit"> </i> <span class="offscreen">Edit post</span></button>
<button><i class="icon-edit"> </i> Edit post</button>

{% highlight html %}
<button><i class="icon-edit"> </i> </button> 
<button><i class="icon-edit"> </i> <span class="offscreen">Edit post</span></button>
<button><i class="icon-edit"> </i> Edit post</button>
{% endhighlight %}


### Read more
Read more... <q>read more</q> what? 

### Lazy keyboard only support
Hands down the simplest thing to add to your site is `:focus` states. My lazy-no-design-needed rule is make the focus state the same as the hover state. 

I have a snippet in sublime that triggers on <q>hocus</q>, outputting both `:hover` and `:focus` selectors for me like so, you will never need to think of focus states again.
{% highlight sass%}
&:hover,
&:focus {
    // state change
}
{% endhighlight %}

The above assumes I am already nested with an `a` or `input` selector and adds so much visual clarity to the site keyboard only user's should never have any doubt on what link they are on again.

### Buttons
A pet hate of mine is a link with no location that's hooked up to a javascript event link so `<a href="#"/>`. Even worse is `<span onclick="toggle(this)"/>`, the 90's called and they want their dialups back. While it can be made accessible, a lot of the time it's simply the wrong element used for the wrong purpose. A better way to think of interactivity is:

* if the action **navigates** to a new page, it should be a **link**
* if the action **finalises** something, it should be a **submit button**
* if the action **triggers a javascript event** it should be a **button**

Buttons (`<button> button text </button>`, not `<input type="button"/>`) are fantastic for client side events and a fairly overlooked element when it comes to accessibility. They natively offer:

* event actions such as hover, focus and click
* tab focus
* space, enter or click presses
* embedded HTML
* pseudo elements

I will always use buttons, mostly creating them in javascript, for things like tabs or toggles on the same page. So don't use a `div` with a click handler, just use a button!

#### Postback support
{% highlight javascript %}
$("<button>", {
    text: "toggle"
}).on("click", function(event) {
    if (event) event.preventDefault();

    // remaining logic
});
{% endhighlight %}

The above comes in handy for creating a javascript button. I stops things like postbacks to servers being triggered or any other user agent events hooked up, as well as allowing `.trigger()` to be called remotely on the object without causing errors.

### Use javascript
because?


## Conclusion
If you can keep in mind these small steps then accessibility can become second nature and part of good development practices. Treat having both hover and focus states the same as a solid color fallback for a gradient, and your sites we be instantly more accessible.