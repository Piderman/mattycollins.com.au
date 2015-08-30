---
title: Anthology of Interest II
category : anthology-of-interest
excerpt : Leaving Photoshop behind...but...not really
tags :
- design
- style tile
- prototype
comments : true
seo__desc : For this redesign, I opted with a much more modern approach to design with the majority of it being done in the browser
seo__key : style tiles, designing in browser, modern web design
related: Anthology of Interest I
icons : info
---
For this redesign, I opted with a much more modern approach to design with the majority of it being done in the browser.
<!-- /intro -->

## The deliverable(s)
Typically, high fidelity compositions of every page of a site will be designed, shown to the client, reviewed and approved before the development process starts. A massive advantage of being my own client (one of the few perks) meant I could adopt a more agile approach.

At the end of my design phase only two designs were produced: the home page and a style-tile[^1] inspired internal page. Design only focused on typography, layout and component basics such as the sidebar. Everything else however was done right then and there in the browser.

## In browser advantages
There's so much that static designs fail to communicate, mainly regarding interactive and behaviors. Add to this responsive changes such as grid and hierarchical it can become increasingly difficult to create and maintain multiple documents.

I much prefer to create prototypes in the browser, the instant feedback it gives you well worth any time spent producing code. Another advantage is that time can spent fine tuning the design in correct medium the site would finish in. Pushing pixels around in Photoshop is time wasted when we have tools such a inspectors and dare i say CSS that quickly create rules for grids and gutters. Not happy with the size of your gutter...have fun updating *all* of them in Photoshop when it can be a one-liner in CSS.

## Examples from this site
As mentioned before, typography and basic wire framing where done in Photoshop. So what wasn't?

* home page  "blog" heading
* drop-capital on blogs
* blog landing page
* about page
* mobile header navigation
* adaptive grid / layouts
* sidebar content vertical spacing

The major changed I noticed during this approach was on the "about" page. The structure was initially the same as the blog landing page (content first on the left, picture and bio second on the right) but after spam-adjusting the browser size it didn't feel right having the bio after the content. Adjusting it for that page only made the content flow much better and was a simple code change that I think would have happened had I not been religiously adjusting my browser width.

So I will leave you with the parting though of "what feels right" as the best way to design in browser. Design compositions can only go so far but they cannot reflect or describe how your site will actually behave across varying devices.

#### Next time on <cite>Anthology of Interest</cite>
Learning SMACSS. Warning, code heavy!

[^1]: [style tiles](http://styletil.es/), a visual web design process for clients and the responsive web
