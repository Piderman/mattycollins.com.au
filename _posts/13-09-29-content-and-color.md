---
layout : default
title: Anthology of Interest I
category : the-making-of
excerpt : Part one in my looking-into-how-I-developed-this-site thing, working with content and color
tags :
- design
- typography
- color
---
During the design of the site, I wanted to focus two main things: typography and color.
<!-- /intro -->

## Content
Being a sucker for mobile first development, it made sense that content should be the starting point of the re-design. I had the good fortune of having three to four posts left over from the previous site so I had real content to design around, with the exception of [this page](/blerg/the-making-of/lorem-ipsum) to cover any missed options.

I tried something new when designing this site by paying close attention to how the content was going to be viewed. Trent Walton's post on [fluid type](http://trentwalton.com/2012/06/19/fluid-type/) helped me greatly as the basis for my grids, the sidebar *should* be just shy of the 75 character mark, and the text is sized across various screens appropriately to meet this line length mark. This way of thinking flowed through in development, as it forced me to think in terms of <code>em</code>'s rather than <code>px</code>. I capped my content sections at <code>36em</code>, that way even if a grid spanned say 60% of the screen, the text inside would still be nice a readable.

## Color
Ms [Laura Kalbag](http://laurakalbag.com/) was a massive influence[^1] on using color in design. In a similar way how she used color across each area of the site, I wanted color[^2] to break up parts of the page. My palette consisted of the yellows from the giraffe into the red headers, complimented with the blue on the home page.

My starting point was the blues and the strips on the home page, using the cool tool [color code](http://colourco.de/monochrome-light/5/%235f6f83). As a coincidence i was able to use Dayle Rees' [Tron theme](https://github.com/daylerees/colour-schemes#tron) to continue with the blue from the home page. With the pallet complete, it was time to move onto @todo: finish

#### Next time on <cite>Anthology of Interest</cite>
Style tiles and designing in browser, yesh!

[^1]: Imitation is a form of flattery right?
[^2]: color/colour, ugh