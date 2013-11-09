---
layout : default
title: Device testing in Visual Studio
category : development
excerpt : A basic solution for testing local sites when using Visual Studio's dev engine
tags :
- workflow
- rwd
- device testing
- visual studio
- javascript
- sitefinity
published : false
---
A neat javascript solution for testing local sites with Visual Studio on devices.
<!-- /intro -->
![Got a problem, we can solve it](http://www.politicspa.com/wp-content/uploads/2013/01/Problem-Solvers-30-Rock.jpg)

## issue
localhost is great and all, but VS' dev engine restricts port access to only the computer / device running it

no images working

## simple
simple as in buggy outside of design...

only good for looking at images (what it was designed for)

fails on links or login journeys that hit localhost, could be extended


{% highlight javascript %}
//  replace local host imgs with port-forwarded IP
// search for the localhost addresss, replace it with the ip. need to ask for IP and port
;(function($, undefined) {
	var fakeLocalhost = {
		
		init : function(options, elem){

			var _self = this;

			_self.elem = elem;
			_self.$elem = $(elem);

			_self.options = $.extend( {}, $.fn.fakeLocalhost.options, options);


			// !abort: only do so if we aren't on the IP
			if (window.location.host != _self.options.ip ) {
				console.log("you are local. aborting");
				return;
			}


			_self.$image = _self.$elem.find("img[src*='localhost:']");


			_self.replaceImages();
		},

		// remove local address and add new IP
		replaceImages : function() {
			var _self = this;

			_self.$image.each(function(){
				var $image = $(this),
					localSource = $image.attr("src"),
					replacing = "localhost:" + _self.options.localPort,
					ipSource = localSource.replace(replacing, _self.options.ip);

				$image.attr("src", ipSource);
			});
		}

	};
	

	$.fn.fakeLocalhost = function(options) {
		//do each instance of the selector, returning so we can chain
		return this.each( function() {
			//sets up a new instance ja? MC: using "_" so i dont get confused with uppercase declaration
			_fakeLocalhost = Object.create(fakeLocalhost);
			_fakeLocalhost.init(options, this);
		});

	};

	$.fn.fakeLocalhost.options = {
		localPort : "55288",
		ip : "192.168.1.57:8080"
	}
})(jQuery);

$("body").fakeLocalhost();
{% endhighlight %}