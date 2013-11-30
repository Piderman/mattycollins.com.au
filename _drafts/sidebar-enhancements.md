---
layout : default
title: sidebar enhancements
excerpt: A more manageable approach to related posts in Jekyll 
---
Adding some customisation and flexibility to my sidebar for a better user experience.
<!-- /intro -->


## Where automation failed
I'm not saying there is anything wrong with Jekyll's "related post" logic, it's solid. My understanding is it takes into account both tags and categories which is fantastic, but during the launch of my site I found that it almost always reflected my "recent posts" due to the small sample size, even with the `--lsi` flag[^1] enabled at build time.

I was after something with more control, what if there wasn't even anything related to this post? While this is an edge-case with a bit of work it could still be taken care of.

## Improved call to action
You know that feeling when you are watching a new TV series, how easy it is to watch another episode? So often you say <q>one more</q> and suddenly it's 3am. That's what I was after. Keeping the reader's interest and leading them somewhere specific after an action[^2] to keep them engaged in the content while their mind is still focused on it, rather than pondering what to do next...

![finding nemo animated gif](/content/images/now-what.gif)

### Hand picked posts
Imagine this, dear reader. You have just finished reading a post that I used to style my content. There you are, all daized and confused as this entry made no sense what-so-ever and without context it is completely meaningless. 

But there was context. As mentioned in <cite>Anthology of Interest I</cite> that pages was used to test my typography. The concept of hand-picked posts meant I had greater control over directing readers around the site. It is perfect for when a reader wants to find out more on a topic they have just read about, such as Sass techniques or a string of entries about rake even though they are six months apart. 

Jekyll's related posts didn't give me that control that I was after, and at the loss of automation the improved reading experience is well worth it.

## `YAML` to the rescue
how it was done and why (title w loop, downcase advantage)


[^1]: link to jekyll docs on LSI 
[^2]: 404, purshed item, just regestered etc