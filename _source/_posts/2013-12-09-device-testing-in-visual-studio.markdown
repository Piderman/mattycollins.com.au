---
title: Device testing in Visual Studio
excerpt : More cooperation with Visua Studio and device testing
tags :
- workflow
- rwd
- device testing
- visual studio
- javascript
- sitefinity
comments : true
seo__desc : seo_description
seo__key : seo_keyword, search_engine_keywords
published: false
---
Testing local sites on devices is not as straight-forward as you'd expect it to be when using Visual Studio.

<!-- /intro -->

Local developement with XAMPP handles this off the bad, but Visual Studio needs a bit of help to get running. Device testing in the past for me meant pushing the site out to a development server, almost removing any advantage of developing locally.
<figure>
	<img src="http://www.politicspa.com/wp-content/uploads/2013/01/Problem-Solvers-30-Rock.jpg" alt="Got a problem, we can solve it"/>
	<footer>Image credit: <cite>30 Rock</cite> NBC</footer>
</figure>

## Local server
It seems that Visual Studio's developer engine is a restricted ISS. Not being a server guy/sys admin, I have know idea what that means. Long story short, the port that your site runs on locally is only accessible to the machine that's running it, dang.

For example, run a local site from Visual Studio, lets say it sets it up on `:52788`. You cannot type `http://localhost:52788` on a mobile phone now can you? as there is nothing on that device running a server. You try to then access via the IP of the computer running the server as you are on the same network, that should be do-able. You find out our IP via the old `ipconfig` in command line, but type that into your phone and it wont work, still no server.

### Port forwarding
So only your PC knows about the server. Dang. With port forwarding though we can route an open port, something in the 8000 range, to the port the Visual Studio has created. My setup would run as follows:

* find the IP of your PC (eg: `192.168.1.57`)
* run Visial Studio server
* open MS Soap Trace
* route `8080` to the server (eg: `52788`)
* hit `//192.168.1.57:8080` and see my local site on my mobile
* as far as your PC is concerned it's a local request and the site is severed


### Almost there
Now we have a site on our phone or anything connected to the server such as account manager's PCs. But there is one small issue, images. Depending on how assets are served (we use Sitefinity), they could be served with the site's address hardcoded into the path such as `localhost:52788/path/to/image`. That's no good for us.


## Simple
Simple as in buggy outside of design...

only good for looking at images (what it was designed for)

fails on links or login journeys that hit localhost, could be extended


{% highlight javascript  %}
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
