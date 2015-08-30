---
title: Anthology of Interest III
excerpt : A quick look at Jekyll on this site
comments : true
category : anthology-of-interest
seo__desc : A quick look at Jekyll on this site
seo__key : jekyll, CMS
tags: Jekyll
related :
- Anthology of Interest II
- Anthology of Interest I
icons : info
---
A new design came with some new (to me) ways to build. This time focusing on the tech behind the site.
<!-- /intro -->

As stated earlier, this site used to run[^1] on WordPress before moving to Octopress and finally on Jekyll. Once the design was finalised, it was time to actually start developing this thing. That brought on the question of how.

## Structure of this site
Jekyll has the concept of includes, which is something I haven't seen in a CMS before. They have made it easier to maintain consistent code across my four page types. Its not much, but my `_includes` folder has

- HTML head
- page hearder
- page footer
- bio

Looking at it now though I can see the giraffe should be moved into an include. The site is also somewhat small, with only a few components needed to be built, making it a very achievable target for working with a new system.

- four variants for listing posts
- page views for home, blog view, and page


### Pages
Pages are unfortunately a mixture of markdown and HTML. The home and the about page for example have content littered with HTML. The idea was to have all of the page logic in the layouts with pages being as minimal as possible for easier editing

{% highlight markdown  %}
---
layout: page
title: something
---

## dat markdown
and some content
{% endhighlight %}

In an ideal world all pages would like this this, but due to the inconsistent structure of these pages it wasn't to be.

### Posts
Some general YAML as per the [Jekyll guides](http://jekyllrb.com/docs/frontmatter/) is used on the posts with some additional fields for SEO. To achieve the summary seen on the blog and home page I needed to start each post with the following

{% highlight html  %}
{% raw %}{{ post.content | split: '<!-- /intro -->' | first }}{% endraw %}
{% endhighlight %}

This allowed for simple plain text to been on the side bar, and a small preview of the post that would also flow natural when viewing an post.

## More Jekyll-ness
As this site currently stands, its [rather basic](https://twitter.com/iamdevloper/status/420254040677961728) with only some minor changes [^2]. I'm working on a [side project](https://github.com/Piderman/DESI) that aims to deal with multiple types of collections and more efficient:

{% highlight html  %}
{% raw %}<ul>
{% for page in site.pages %}
    {% if include.collection == page.mission__category %}
    <li>
        <a href="{{page.url}}">{{page.title}}</a>
        {{page.mission__crew}}, {{page.mission__type}}, {{page.mission__outcome}}
    </li>
    {% endif %}
{% endfor %}
</ul> {% endraw %}
{% endhighlight %}

The above will loop through pages in the site, returning only those that match a custom property. As this list is structurally the same when used, it can be maintained in one place and easily reused with `include loop.html param='value'`


[^1]: I say <q>run</q>, but to be honest not much work on that build was ever done
[^2]: see my post on [related posts]({% post_url 2013-12-03-better-related-posts %})
