---
layout : default
title: Double-stranded sass
category : the-making-of
excerpt: over-the-top sass
---
I have been reading a lot of late about working on large projects and the many ways of developing so that CSS is doing more for you. To paraphrase the internet <q>the less CSS you write, the less you need to debug</q>. I would like to share an approach that I use in my SASS.
<!-- /intro -->
[Harry Roberts](http://www.csswizardry.com) has been a great source for me during the projects. He wrote about [an OOCSS technique](http://csswizardry.com/2012/02/pragmatic-practical-font-sizing-in-css/) for typography, I think the approach lends itself to abstractions in SASS as well.

##The Issue
Sometimes I cannot decide what is best for an abstraction: using a mixin or a silent extender / placeholder. It can be pretty clear-cut: if only the values change, its a mixin; if it never changes then I will use a placeholder.

Placeholder can get confusing though and have their weakness. In some cases fall victim to specificity wars, and if you are doing a responsive site you can through them out as they cannot be used in media queries (IMO, this is a <strong>good</strong> thing). But alas, it feels wrong using a mixin without passing values to it, while the code lives in place it can lead to unnecessary bloat.


##How I do my SASS
Like the OOCSS approach of double-strands to headings, I will apply the same styles to both a mixin(element) and a placeholder(class) so I can use them when either suits.

Take the clearfix for example, here's how I write it.

{% highlight sass %}
@mixin clearfix {
	&:after { content: ""; display: table; clear: both; }
}

%clearfix { @include clearfix; }

.clearfix { @extend %clearfix; }
{% endhighlight %}

This allows me to:
* have the code for module only exist once
* use it as an @include inside a media-query
* use it as an @extend on anything I cannot add the class to
* use it as a class in the HTML

The end result is very minimal as it mainly runs off SASS's concatenation when using extends. Its a bit of extra work to setup, but when the module is small like the clearfix, it becomes very powerful and portable.

##More complex case
The above works well for a simple or single element case, but there will no doubt be tough ones. This is how I write the media object.

{% highlight sass %}
//both parent and content
@mixin media{
	overflow: hidden; zoom: 1;
}

//image, with align options
@mixin media__img($align:"left"){
	@if $align == "left" {
		float: left;
		margin-right: 10px;
	} @else {
		float: right;
		margin-left: 10px;
	}
}

%media { @include media;}
%media__img { @include media__img; }
%media__img--alt { @include media__img("right"); }
%media__content { @include media; }

.media { @extend %media;}
.media__img { @extend %media__img; }
.media__img--alt { @extend %media__img--alt; }
.media__content { @extend %media__content; }
{% endhighlight %}
