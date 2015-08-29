---
title: Better related posts
excerpt : A more manageable approach to related posts in Jekyll
comments : true
category : enhance
tags :
- feature
- jekyll
- user experience
- related post
related : jekyll up and running
seo__desc : A more manageable approach to related posts in Jekyll
seo__key : related post, jekyll, user exprience, UX
icons: wrench
---
Adding some customisation and flexibility to my sidebar for a better user experience.
<!-- /intro -->


## Where automation failed
I'm not saying there is anything wrong with Jekyll's "related post" logic, it's solid. My understanding is it takes into account both tags and categories which is fantastic, but during the launch of my site I found that it almost always reflected my *recent posts* due to the small sample size, even with the `--lsi` flag[^1] enabled at build time.

I was after something with more control: what if there wasn't even anything related to this post? While this is an edge-case with a bit of work it could still be taken care of.

## Improved call to action
You know that feeling when you are watching a new TV series, how easy it is to watch another episode? So often you say <q>one more</q> and suddenly it's 3am. That's what I was after. Keeping the reader's interest and leading them somewhere specific after an action[^2]. Keeping them engaged in the content while their mind is still focused on it, rather than pondering what to do next...

![finding nemo animated gif](/content/images/now-what.gif)

### Hand picked posts
Imagine this, dear reader. You have just finished reading the post that I used to style my content. There you are, all dazed and confused as this entry made no sense what-so-ever and without context it is completely meaningless.

But there was context. As mentioned in <cite>Anthology of Interest I</cite> that page was used to test my typography and was very relevant. The concept of hand-picked posts meant I had greater control over directing readers around the site. It is perfect for when a reader wants to find out more on a topic they have just read about, such as Sass techniques or a string of entries about rake even though they are six months apart.

Jekyll's related posts didn't give me the control that I was after, and at the loss of automation the improved reading experience is well worth it.

## `YAML` to the rescue
I figured the easiest way to maintain related posts would by via the post title as it was a unique attribute that already existed, so yeah pretty clear winner there. Adding either one or more `related` items to each post would trigger the following on the post details page.

{% highlight html  %}
{% raw %}{% for related__item in page.related %}
  {% assign post__related = related__item | downcase %}

  {% for post in site.posts %}
    {% assign post__title = post.title | downcase %}
      {% if post__title == post__related %}
        <a href="{{ post.url }}" class="button">{{ post.title }}</a>
      {% endif %}
  {% endfor %}
{% endfor %}{% endraw %}
{% endhighlight %}

Not much to it really, just comparing the value of the each `page.related` to the titles in `site.posts` return any valid ones. Some slight shifting of content and visuals and there it was, better call to action for related posts!

[^1]: LSI: [Produce an index for related posts](http://jekyllrb.com/docs/configuration/)
[^2]: Such as adding products to cart or order confirmation for e-commerce, site/event registration and even 404 pages
