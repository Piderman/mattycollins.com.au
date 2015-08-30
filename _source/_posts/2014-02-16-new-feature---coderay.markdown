---
title: New feature - Coderay
excerpt : Swapped to kramdown for posts and Coderay for syntax highlighting
comments : true
seo__desc : Swapped to kramdown for posts and Coderay for syntax highlighting
seo__key : kramdown, coderay, syntax highlight
category : enhance
tags :
- syntax highlighting
- feature
related : New feature &ndash; Disqus
icons:
- wrench
---
After some behind-the-scenes drama, syntax highlighting is finnaly running!
<!-- /intro -->

This blerg began in a Wandows environment, meaning the default <cite>Pygments</cite> syntax engine wouldn't work[^1]. Now that work is no done on a Mac I could finally enable pygments and have all the features that Jekyll has, right?

## pygments : true
Never has one line caused so much grief. Pygments wouldn't work with liquid's `highlight`, so that had to get replaced with codeblocks, which I couldn't get working working. After a while a fell into this fun loop:

1. code highlighting doesn't work
1. fix that but brakes a key markdown feature
1. fix that but break another part of the site
1. fix that, goto 1

So the idea of better syntax highlighting was abandoned untill I stumbled across <cite>Kramdown</cite> and its <cite>Coderay</cite> support.

##Coderay
Here's what the old codeblocks looked like: single color blocks with colors used to show the languages.

![old monotone syntax highlighting](/content/images/old code example.png)

It was OK and it did the job. But the below is more readable and just looks awesome.

{% highlight javascript  %}
var buttonText = $(".tabContent h2").text();

$("ul.tabs").insert("<li><button class='tab'>" + buttonText + "</button></li>" );

$("ul.tabs").find(".tab").click(function(){
  $(this).parent().toggleClass("active");
  // ...
});
{% endhighlight %}

So long story short after weeks of messing around Coderay is now running and markdown has been updated. Shiny!

[^1]: According to the Jekyll docs, Jekyll wasn't even supported on Wandows
