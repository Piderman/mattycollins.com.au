---
title: jQuery conventions
excerpt : Ways for creating and using DOM elements in jQuery
comments : true
seo__desc : Ways for creating and using DOM elements in jQuery
seo__key : jQuery, DOM, create, create DOM elements, creating elements in jQuery, working with the DOM
tags: jQuery, methodology
icons:
- code
---
Javascript (read: jQuery) was something I struggled with in my early days as it can be quite intimidating at times. Here are some of the techniques I have picked up over the years.
<!-- /intro -->

## TL;DR:

- lazyness can lead to messy and redundant code
- prefix DOM elements with <q>$</q>
- DOM is slow so cache elements and reuse them
- create and cache via `var $button = $("<button>")`;
- use `each()`, `eq()` and `index` to pair elements, keeping the DOM clean
- read [30 days to learn jQuery](https://tutsplus.com/course/30-days-to-learn-jquery/)


### Messy code
Just quickly, here's why I didnt like it.

{% highlight javascript %}
var buttonText = $(".tabContent h2").text();

$("ul.tabs").insert("<li><button class='tab'>" + buttonText + "</button></li>" );

$("ul.tabs").find(".tab").click(function(){
  $(this).parent().toggleClass("active");
  // ...
});
{% endhighlight %}

Not knowing exactly what I was looking at, javascript was an ugly mess of variables hiding within random chunks of HTML. This was a pain to read. What am I looking at? Nasty swapping of quotes, or even worse escaping them like so `"<li class=\"something\">"` looks even more confusing, gargh! The concatenation of the variable text gets lost in elements as well.

## Prefix element varialbles
By prefixing DOM elements with a <q><code>$</code></q> (shorthand for <q>jQuery</q> for those playing at home) it should make it easier to see what is a variable and what is an element. This comes in handy when making elements or using existing ones.

{% highlight javascript %}
var $slider = $(".slider"),
    $image = $slider.find("li"),
    timing = 630;
{% endhighlight %}

Now it should be clear in this line what is an element and what is a variable: `$image.fadeOut(timing);`

## Cache elements
I also didn't realise that every time you wrote `$("#element")` you had to check the DOM again and again. Caching elements meant the DOM was only checked once, allowing for optimized code with a lovely advantage of reducing repetitiveness. I tend to cache all the elements I expect to use at the top of a function. After all, all these elements tend to be related when you are working within the one function.

{% highlight html %}
<div class="tab">
  <div class="tabContent">
    <h3 class="tabHeading">first content</h3>
    <!--  -->
  </div>
  <div class="tabContent">
    <h3 class="tabHeading">something else</h3>
    <!--  -->
  </div>
  <div class="tabContent">
    <h3 class="tabHeading">another guy</h3>
    <!--  -->
  </div>
</div>
{% endhighlight %}


{% highlight javascript %}
var $tab = $(".tab"),
    $content = $tab.find(".tabContent"),
    $heading = $content.find(".tabHeading");
{% endhighlight %}

Take the basic tab pattern for example. We start with the wrapping element `$tab`, search that same element for the contents that we will be toggling the display of, then search that content again for headings.

Now if we can make buttons with the text of a heading using `$heading.text()` without looking at the DOM again as we already have access to it.

## Creating elements
The same function for selecting elements `$(selector)` can also be use to create elements. `$("<button>")` will create a blank button. This function actualy accepts another parameter when creating elements. By sending an object `{}` we can setup additional properties.

{% highlight javascript %}
var $awesomeButton = $("<button>", {
    "class" : "totesAmazeButton",
    "text" : pageTitle + " with jQ"
}).appendTo("body");
{% endhighlight %}

This verbose method gives you access to addition properties that come in rather handy. Its also more readable in the the JSON-ish structure allows you to scan line-by-line through each property of the element and highlight strings vs variables. Note the final use of jQuery's chaining ability of `.appendTo()` to place the element in DOM immediately after creating it.

## Use index
Typically a loop will almost always be involved when doing something in jQuery. In the above tabs for example, if you can think each element as an item array (in that there are multiple `$heading`s ), then you can communicate with cached elements using `.eq(index)`. The `each()` function allows you to get the current iteration of the loop via `index` which can be passed through.

{% highlight javascript %}
$heading.each(function (index) {
  var $button = $("<button>", {
    text : $heading.eq(index).text();
    }

  // also setup the click
  ).on("click", function() {
    $content.eq(index).toggle();
  }).insertBefore($tab);
});
{% endhighlight %}

The above means we don't need anything extra in the DOM to connect a button its content. There is a 1-1 connection now as each `.tabContent` has a matching button with the text of the heading with the exact same index.

## Scafolding
Combing some of the above, a move complex navigation for the tabs can be setup. I'd prefer that each button is outputted in a list. The below will feel very long-hand for a basic `ul > li > button` setup, but helps a lot when dealing with more complex situations.

{% highlight javascript %}
// [1]
var $ul = $("<ul>").class("tabNav");

$heading.each(function(index){
  // [2]
  var $li = $("<li>"),
    $button = $("<button>", {
      text : $heading.eq(index).text();
    }).on("click", function(){
      // ...
    });

  // [3]
  $li.append($button).appendTo($ul);
});

// [4]
$ul.insertBefore($tab);
{% endhighlight %}

Skipping over the event attachment from before, the above code

1. creates an empty `ul` for us to insert the created markup into
1. creates an empty `li` and the `button` for each instance of the loop
1. using readable chaining, places the `button` in the `li`, then said `li` into the `ul` in the correct order
1. once the loop is done, we place the entire `ul` in front of the `.tab`.

As jQuery returns the updated element each time, it means that we are adding a fully populated list into the DOM in step 4.

## Conclusion
Writing jQuery this way I have found my code more connected and easier to read. I prefer the long-hand approach as it promotes reuse, readability and documentation to occur. As an added bonus your code is more efficient, its a win-win!

Also, stay tuned for a follow-up on creating an automatic table-of-contents that will cover structuring functions with DOM manipulation.
