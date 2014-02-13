---
layout : default
title: jQuery conventions
excerpt : Ways for creating and using DOM elements in jQuery
comments : true
seo__desc : Ways for creating and using DOM elements in jQuery
seo__key : jQuery, create DOM elements, 
---
Javascript (read: jQuery) was something I struggled with in my early days as it can be quite intimidating at times. Here are some of the techniques I have picked up over the years.
<!-- /intro -->

###Messy code
Just quickly, here's why I didnt like it. 

{% highlight javascript %}
	var buttonText = $(".tabContent h2").text();
	
	$("ul.tabs").insert("<li><button class='tab'>" + buttonText + "</button></li>" );

	$("ul.tabs").find(".tab").click(function(){
		$(this).parent().toggleClass("active");
		// ...
	});
{% endhighlight %}

Not knowing exactly what I was looking at, javascript was an ugly mess of variables hiding within random chunks of HTML. Here's how I used to create a button with text from a heading in the page, typically for say an accordion.

This was a pain to read. What am I looking at? Nasty swapping of quotes, or even worse escaping them like so `$.insert("<li class=\"something\">");` looks even more confusing, gargh! The concatination of the variable text gets lost in elements as well.

##Prefix element varialbles
By prefixing DOM elements with a `$` (shorthand for jQuery for those playing at home) it should make it easier to see what is a varialbe and what is an element. This comes in handy when making elements or using existing ones.

{% highlight javascript %}
	var $slider = $(".slider"),
		$image = $slider.find("li"),
		timing = 500;
{% endhighlight %}

Now it should be clear in this line what is an element and what is a varialbe: `$image.fadeOut(timing)`;

##Cache elements
I also didn't realise that every time you wrote `$("#element")` you had to check the DOM again and again. Caching elements meant the DOM was only checked once, alowing for optimized code with a lovely advantage of reducing repitiveness. This is seen a lot when in click events


##Use `.index`

##Working example
