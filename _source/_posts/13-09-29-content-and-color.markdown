---
title: Anthology of Interest I
category : anthology-of-interest
excerpt : Part one in my looking-into-how-I-developed-this-site thing, working with content and color
tags :
- design
- typography
- color
comments : true
seo__desc : During the design of the site, I wanted to focus two main things\:typography and color.
seo__key : design, typography, color, content first
related :
- Anthology of Interest II
- A Pharaoh to Remember
icons : info
---
During the design of the site, I wanted to focus two main things: typography and color.
<!-- /intro -->

## Content
Being a sucker for mobile first development, it made sense that content should be the starting point of the re-design. I had the good fortune of having three to four posts and the homepage content left over from the previous site so I had real content to design around, with the exception of [this page](/blerg/the-making-of/lorem-ipsum) to cover any missed options.

I tried something new when designing this site by paying close attention to how the content was going to be viewed. Trent Walton's post on [fluid type](http://trentwalton.com/2012/06/19/fluid-type/) helped me greatly as the basis for my grids, the sidebar *should* be just shy of the 75 character mark, and the text is sized across various screens appropriately to meet this line length mark. This way of thinking flowed through in development, as it forced me to think in terms of <code>em</code>'s rather than <code>px</code>. I capped my content sections at <code>36em</code>, that way even if a grid spanned say 60% of the screen, the text inside would still be nice a readable length.

While this is common knowledge for designers, it was interesting learning the reasons for design decisions and core user experience concepts.

Keeping with the concepts from my early designs of the site, I used serif fronts for headings to contrast against the clean, sans-serif copy and a dash of cursive / hand-written for navigation.


## Color
Ms [Laura Kalbag](http://laurakalbag.com/) was a massive influence[^1] for using color in design. In a similar way that she used color across the areas of the site, I wanted color[^2] to break up parts of the page. My palette consisted of the yellows from the giraffe into the red headers, complimented with the blue on the home page.

My starting point was the blues of the color strips and blog headings that made up the home page, using the cool tool [color code](http://colourco.de/monochrome-light/5/%235f6f83). A complimentary red was needed for the mast head of the page and with that I had my pallet. Its always daunting for me staring at a blank white canvas when designing as there are infinite options. Playing around with this color-by-math theory[^3] helped point me in the right direction with the analogous purples and blues of the posts lists and contrasting header.

The next step would be to make sure these [colors are accessible](http://24ways.org/2012/colour-accessibility/) as I only did a basic black and white contrast comparison. Baby steps&hellip;

#### Next time on <cite>Anthology of Interest</cite>
Style tiles and designing in browser, yesh!

[^1]: Imitation is a form of flattery right?
[^2]: Color/colour, ugh
[^3]: [tutsplus](http://webdesign.tutsplus.com/articles/design-theory/an-introduction-to-color-theory-for-web-designers/) cleary do a better job than I could