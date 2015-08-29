---
title: Semantic classes in CSS
excerpt : How hard can it be right?
comments : true
tags:
- CSS
- semantics
- opinion
seo__desc : Issues with naming classes in CSS to communicate use and appearance
seo__key : semantic class names, CSS class, styling class, approach to naming classes
icons:
- code
- css3
---
After almost three years of writing CSS at a professional level I have realised something. Its really hard&hellip;
<!-- /intro -->
and [I don't know shit](//twitter.com/cmrPyro/status/425104876033425408).

## TL;DR:

- target by class for potentially simpler selectors and maintenance
- how to define a descriptive and meaningful class name?
- elements littered with classes can be a nightmare to maintain or update
- Sass (read: preprocessors) can reduce this overhead via `@extend`
- still feels like a trivial mess


## In the beginning
I learnt the basics of selectors but quickly grew frustrated with writing `#header .nav ul li a`, getting into troubles with specificity and replicating the DOM order. I then read about scoping with intent[^1] and started writing much cleaner selectors such as `.nav a`.

This simplicity quickly fell apart on anything slightly more complex. Styling by elements was too prone to breaking and raised semantic issues[^2]. Adding a class on the element I was trying to style gave me grater consistency and shallow specificity which sounded perfect. Now I just need to call it *something meaningful*. Grab a drink and a comfy chair as this could take a while.


## Class Wars
Take a list of news displayed two different ways: this first `.recentArticles` simply has links and dates; the latter `.newsList` with a bit more info, maybe even a picture. Design calls for these two headlines to look the same so I need to decide what markup suits best *and* as well as achieve consistent visuals.

So this is what runs through my head before deciding on a name for this headline class?

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

The naming convention ideas of [BEM](http://bem.info/method/definitions/) springs to mind, so I add the same class to the title element as well as something on the partent to tell the two apart if need be.

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
BEM to the rescue! Well, nope. I have jumped the gun and started too early on CSS and have forgotten about my blog list which is visually identical, as is tradition. Simple you might think, just use the class `blog__title`. But dear reader I must stop you. The separation of concerns says to remove the visual layer from the content layer. All of a sudden this starts to become tricky as:

- This class isn't resuable as it suggest this style only applies to the blog
- We are using the class to describe the contents of the element when the HTML should be doing that
- We could better communicate the visuals via a pragmatic `.subHeading` or even more abstract `.beta` class

Lets get a bit abstracted now with a new agnostic class of `media__title` so we can group common lists of news, blogs, events, stories, products...the list goes on.

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
Thinking I have my naming conventions nailed down I merrily go about styling a few lovely buttons. One is a call to action so naturally its nice and large, the other is a standard form and the final one aims to confirm a potentially dangerous action.

I love BEM so lets run with it. Convinced its awesome as well as borrowing some conventions off Bootstrap (or even using the framework) I end up with this:

{% highlight html %}
<a href="/donate" class="button button--large button--blue">donate now</a>

<input type="submit" class="button" value="become a member">

<button class="button button--warn">delete changes</button>
{% endhighlight %}

No problems[^3] with that, push the code to the server! Smash-cut to a month later and the site is undergoing some minute changes, trivial if you will. A slight change in branding results in this

{% highlight scss %}
.button--blue {
  background: red;
}
{% endhighlight %}

Well, we're boned. They have also asked for the the button to be made smaller but at least that's just removing a class, until you notice that large donate button lives in several locations and needs to be tracked down.

## Let Sass do the lifting
By reducing the classes we have on the markup we can allow Sass to take the burdon of *visually describing* the elements in question. Below opts for a meaningful name void of any declarative class names that run the risk of changing.

{% highlight html %}
<div class="m-banner">
  <h2>Support us</h2>
  <a href="/donate" class="banner__button">donate now</a>
</div>
{% endhighlight %}

Jumping into Sass we can use those classes we originally had on the front-end as silent placeholders and then apply them as needed to those elements.

{% highlight scss %}
// common
%button {
  padding: 5px 10px;
  background: $primary;
  color: #000;
}

%button--alternate {
  @extend %button;
  background: #ce8e35;
}

%button--large {
  font-size: 1.5em;
  padding: 10px 30px;
}


// ... elsewhere in the project

.banner__button {
  @extend %button--large;
  @extend %button--alternate;

  // addition styles
}
{% endhighlight %}

Now we are maintaining the visuals in a consistent place and still communicating how the element appears. Removing or adding extends means all banner buttons in this instance will be affected without the potential risk of crawling the entire site for `button--large`.

## Conclusion
In the end, have I simply moved the problem from one technology to another? At least with classes in the DOM, declaritive they may be, show you what is happening whereas Sass will require source maps and a keen eye to to make sense of the abstracted logic.

Has the move to Sass opened the gates for this to happen all too easily?

{% highlight scss %}

%rounded { border-radius: 5px; }

%rounded--small { border-radius: 3px; }

%rounded--large { border-radius: 10px; }

{% endhighlight %}

One day the task of naming a CSS element for the sake of styling will be a trivial thing. Until then I will continue to have this internal battle for <q>what's best</q> vs <q>what's meaningful</q>. In the end its *just a name*.


[^1]: [Shoot to kill](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/)
[^2]: mainly with #a11y
[^3]: Well, almost. [Problems with CSS classes](http://www.youtube.com/watch?v=u63Sq2Sq3LI)
