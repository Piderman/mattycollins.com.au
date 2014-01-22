---
layout : default
title: Semantic classes in CSS
excerpt : How hard can it be right?
comments : true
seo__desc : issues with naming classes in CSS to communicate use and appearance
seo__key : semantic class names, CSS class, styling class
---
After almost three years of writing CSS at a professional level I have realised something. Its really hard&hellip;
<!-- /intro -->
to [I don't know shit](//twitter.com/cmrPyro/status/425104876033425408).

## TL;DR:

- target by class for potentially simpler selectors and maintainance  
- how to define a descriptive and meaningfull class name?
- elements littered with classes can be a nightmare to maintain or update
- Sass (read: preprocessors) can reduce this overhead via extends/includes
- still feels like a mess


## In the beginning
I learnt the basics of selectors but quickly grew frustated with writing `#header .nav ul li a` by getting into troubles with specificity. I then leart about scoping with intent[^1], writting a much cleaner `.nav a`.

This simplicy quickly fell apart on anything slightly more complex. Styling by selector was too prone to breaking and raised semantic issues[^2], Adding a class on any give me grater consistancy and shallow specifity, sounds perfect. Now I just need to call it _something meaningfull_. Grab a drink and a comfy chair as this could take a while.


## Class Wars
Take a list of news displayed two different ways: this first `.recentArticles` simply has links and dates; the latter `.newsList` with a bit more info, maybe even a picture. Design calls for these two headlines to look the same so I need to decide what markup suits best _and_ as well as achieve consistent visuals.

So this is what runs through my head before deciding on a name for this headline

{% highlight html %}
<ol class="recentArticles">
  <li>
    <a href="#">the title</a>, September 29th
  </li>
  <!-- ... -->
</ol>

<div class="newsList">
  <article>
    <h2><a href="#">the title</a></h2>
    <p>lorem...</p>
    <a href="#">read more</a>
  </article>
  <!-- ... -->
</div>
{% endhighlight %}

Two types of list yet the same content. Time to get styling! How to consistantly target that article headline now?

- both my classes on the parent are different, so I'd need to combine them perhaps with `.recentArticles a, .newsList a`
- `.newsList a` will acidentally get that "read more" link so its out, perhaps via the h2
- add a common class to both lists? no again the "read more" could get picked up
- class on the element it is!

A few naming convention ideas spring to mind such as BEM or a pragmatic approach from the styleguide. Why not both, with a common class for each for consistency sake!

<aside>BEM is a naming convention for communicating hierachy with the added benefit of keeping specificity low. <a href="http://bem.info/method/definitions/">Read more <span class="offscreen">about BEM</span></a></aside>

{% highlight html %}
<ol class="news news--list">
  <!-- ... -->
  <a href="#" class="news__title">the title</a>, September 29th
</ol>

<div class="news news--summary">
  <!-- ... -->
  <h2><a href="#" class="news__title">the title</a></h2>
</div>
{% endhighlight %}

### Not so fast
BEM to the rescue! Well, nope. I have jumped the gun and started too early on CSS and have forgotten about my blog list which is visually identical, as is tradition. Simple you might think, just use the class `blog__title`. But dear reader I must stop you. The separation of concerns says to remove the visual layer from the content layer and starts to take issue with this class name.

- This class isn't resuable as it suggest this style only applies to the blog. What about our news list or any others that may need to follow this style?
- We are using the class to describe the contents of the element, allow the HTML to do that (as we have already seen with the `ol` vs the `article` )
- We could better communicate the visuals via a pragmatic `.subHeading` or even more abstract `.beta`

Lets get a bit abstracted now with this new agnostic class of `media__title` so we can group common lists of news, blogs, events, stories, products...the list goes on.

{% highlight html %}
<ol class="media--list">
  <!-- ... -->
  <a href="#" class="media__title subHeading">BLOG title</a>, September 29th
</ol>

<div class="media--summary">
  <!-- ... -->
  <h2><a href="#" class="media__title subHeading">NEWS title</a></h2>
</div>
{% endhighlight %}

I am now happy as I can visually communicate common styles via this `subHeading` as well as having the ability to make any changes via `media__title` based on the parent class. Awesome. This naming rule can be applied to anything and I can move onto styling me some buttons.

## When blue becomes red
Thinking I have my naming conventions nailed down I merrily go about building these lovely buttons. One is a call to action so its nice and large, the other is a standard form and lastly one to prompt a potentialy dangerous action. 

I love BEM so lets run with it. Convinced its awesome as well as borrowing some conventions off Bootstrap (or even using the framework) I end up with this:

{% highlight html %}
<a href="/donate" class="button button--large button--blue">donate now</a>

<input type="submit" class="button" value="become a member">

<button class="button button--warn">delete changes</button>
{% endhighlight %}

No problems with that, push the code to the server! Smash-cut to a month later and the site is undergoing some minute changes, trivial if you will. A slight change in branding results in this

{% highlight css %}
.button--blue {
  background: red;
}
{% endhighlight %}

Well, we're bonned. They have also asked for the the button to be made smaller but at least that's just removing a class, until you notice that large donate button lives in several locations and needs to be tracked down.

## Let Sass do the lifting
{% highlight sass %}
// common 
%button {
   padding: 5px 10px;
   background: #b3b3b5;
   color: #000;
}

%button--alternate { background: #ce8e35; }

%button--large {
  font-size: 1.5em;
  padding: 10px 30px;
}


// ... elsewhere in the project

.donate .button {
	@extend %button--large;
	@extend %button--alternate;

	// addition styles
}
{% endhighlight %}



- battles of naming classes that communicate style
- issues with framework if it changes/updates
- how i name classes and issues i've run into
- what does the lifting / communication of styles, the CSS or the HTML via classes
- sass via extends



[^1]: [Shoot to kill](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/)
[^2]: mainly with #a11y
[^#]: [Problems with CSS classes](http://www.youtube.com/watch?v=u63Sq2Sq3LI)