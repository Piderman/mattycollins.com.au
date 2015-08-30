---
title: Accessible Sprites
tags :
- accessibility
- sprite
- Sass
- mixin
excerpt : A Sass mixin and method for getting image sprites to appear in Windows High Contrast mode for accessibility
related: accessibility basics
comments : true
seo__desc : A Sass mixin and method for getting image sprites to appear in Windows High Contrast mode for accessibility
seo__key : sprite, Sass, mixin, accessility, high contrast
icons :
- wheelchair
- code
- css3
---

Having worked on two rather big <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0 sites in the last year, by far the hardest thing was figuring out how to get my icons showing up in high contrast mode. My go-to technique would have been using Font Awesome, but I didn't have enough understanding of its use in accessibility to use it site-wide for a project this size. We went with ye olde' image-based sprites for them, but with the use of Sass I have a new technique.
<!-- /intro -->

<p><ins>Edit : After some googles it turns out <a href="http://blog.paciellogroup.com/2010/01/high-contrast-proof-css-sprites"> this guy</a> had the same idea a while ago. Well this is awkward&hellip;</ins>
</p>

## <abbr title="Too long; didn't read?">TL;DR</abbr>:
<p class="intro"><a href="http://codepen.io/Giraffe/details/elCDH">Shee this pen</a>. AA Sprites without the need for an image to exist in the DOM, bam!</p>

The first round of accessibility testing came, and all our icons failed. A solution recommend to us was to have the icon in the DOM as an image, but this site had around 50 icons and I was against doing this. It would have been a nightmare to manage (think of all the hover state changes) let alone the performance hit of all the additional request. Luckily I came across [this article](http://hardlikesoftware.com/weblog/2009/11/04/css-sprites-vs-high-contrast-mode/) which showed me how I could still use the awesomeness of sprites and still make the site accessible.

So that was that, but after another project, having the image in the DOM was becoming harder and harder to maintain. I was not liking the amount of duplication. I tried referencing the sprite file via a pseudo elements <code>content</code> property, which did work for high contrast but I couldn't show only the icon I wanted. A few months later I revisited this method and extended my mixin for sprites to work on a single element (applies the sizing and clipping) with a before element (loads the image and adjust the offset).

## The mixin
{% highlight scss  %}
@mixin sprite($coordinates, $dimensions, $aaMode : false) {

  // box dimensions go on the current element regardless
  width: nth($dimensions, 1);
  height: nth($dimensions, 2);

  @if $aaMode == false {

    // position the sprite background image
    background-position: nth($coordinates, 1) nth($coordinates, 2);
  } @else {

    // offset the image
    &:before {
      left: nth($coordinates, 1);
      top: nth($coordinates, 2);
    }
  }
}
{% endhighlight %}

## Helper Classes
Along with the mixin, I have the following helper class to automagically setup base sprites for me, so all I have to do it call the mixin. All my sprites will have the same background image ready to be positioned, and all my accessible ones will have the image loaded via content, positioned absolutely and clipped by the relative single element.

{% highlight css  %}
.sprite, .sprite--contrast { display: inline-block; }

.sprite { background-image: url("path/to/sprite.png") }

.sprite--contrast {
  posistion: relative;
  overflow: hidden;
}

.sprite--contrast:before {
  position: absolute;
  content : url("path/to/sprite.png");
}
{% endhighlight %}