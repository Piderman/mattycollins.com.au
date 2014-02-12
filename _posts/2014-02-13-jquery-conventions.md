---
layout : default
title: jQuery conventions
excerpt : Ways for creating and using DOM elements in jQuery
comments : true
seo__desc : Ways for creating and using DOM elements in jQuery
seo__key : jQuery, create DOM elements, 
published : false
---
!required intro text
<!-- /intro -->

- used to write `$("<ul><li><a>" + pageTitle + "</a></li></ul>")`
- concatination was ugly, confusing and almost unreadable
- terrible for formance as generally reusing those elements `$(".menu a").on("click", function() $(this).clostest("li"));`
- forgetting to escape quotes or needed to swap between double and single
- what is the difference between a DOM element and a variable?


##has to be a better way

- crawling the DOM is the slowest thing jQ can do (citation needed)
- "scaffold" creation makes use of jQ chainging to communicate what you're building: `$row.append($cell__name, $cell__age).appendTo($table)`

##code walkthrough
create a sub nav based on headings in the page

- find elem
- count the headings
- use index to connect the two (no data-attr)