---
title: Double-stranded Sass
category : the-making-of
excerpt: over-the-top Sass
tags :
- Sass
- OOCSS
comments : true
seo__desc : Double stranded Sass to solve issues such as media queries and CMS so code remains minimal
seo__key: Sass, structure, development, OOCSS, media query, approach, CMS, manageble Sass, maintainance
related : accessible sprites
icons :
- code
- css3
---
Recently I have been reading a lot about working on large projects and the many ways of developing so that the CSS is doing more for you. To paraphrase the internet <q>the less CSS you write, the less you need to debug</q>. I would like to share an approach that I use in my Sass.
<!-- /intro -->

CSS Wizardry has been a great source of information for me during the projects. An article on [a OOCSS technique](http://csswizardry.com/2012/02/pragmatic-practical-font-sizing-in-css/) for typography he wrote lends itself to abstractions in Sass as well.

## The Issue
Sometimes I cannot decide what is best for an abstraction: using a mixin or a silent extender / placeholder. While it can be pretty clear-cut: if only the values change, its a mixin; if it never changes then I will use a placeholder.

Placeholders can get confusing though and have their weakness. In some cases they fall victim to specificity wars, and if you are doing a responsive site you can through them out as they cannot be used in media queries (IMO, this is a <strong>good</strong> thing). But alas, it feels wrong using a mixin without passing values to it, while the code lives in place it can lead to unnecessary bloat.


## How I do my Sass
Like the OOCSS approach of double-strands to headings, I will apply the same styles to both a mixin(element) and a placeholder(class) so I can use them when either suits.

Take the clearfix for example, here's how I write it.

{% highlight scss  %}
@mixin clearfix {
  &:after { content: ""; display: table; clear: both; }
}

%clearfix,
.clearfix { @extend %clearfix; }
{% endhighlight %}

This allows me to:

- have the code for a module only exist once
- use it as an @include inside a media-query
- use it as an @extend on anything I cannot add the class to
- use it as a class in the HTML

The end result is very minimal as it mainly runs off Sass's concatenation when using extends. Its a bit of extra work to setup, but when the module is small like the clearfix, it becomes very powerful and portable.

## A More complex example
The above works well for a simple or single element case, but there will no doubt be tough ones. This is how I write the media object.

{% highlight scss  %}
// both parent and content
@mixin media {
  overflow: hidden; zoom: 1;
}

// image, with align options
@mixin media__img($align:"left") {
  float: $align;

  @if $align == "left" {
    margin-right: 10px;
  } @else {
    margin-left: 10px;
  }
}

%media,
.media { @include media; }

%media__img,
.media__img { @include media__img; }

%media__img--alt,
.media__img--alt { @include media__img("right"); }

%media__content,
.media__content { @include media; }

{% endhighlight %}

Overkill? Perhaps. But when you get into a situation where you find yourself writing the same code again simply because you don't have access to the HTML, or you're inside a media query, this will get you out. I work with CMS's, and this over-the-top approach has saved me on many occasions. The ability to have the same bit of code being called from anywhere, yet only existing in source once is well worth it.
