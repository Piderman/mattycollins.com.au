// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


//utility, polyfill for no object.create() support
if ( typeof Object.create !== "function") {
	Object.create = function (obj) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

/*------------------------------------*/
//create navicon
;(function($, undefined){
	var navicon = {
		init : function(options, elem ){
			var self = this;
			self.elem = elem;
			self.$elem = $(elem);

			// todo: dont hardcode
			self.$content = self.$elem.find("ul");
			
			//allows us to use the defaults or override with any passed
			self.options = $.extend({}, $.fn.navicon.options, options);

			//hard coded options for now
			self.options.activeClass = "is-active";
			self.options.mode = "vertical";

			self.$elem.attr("data-mode", self.options.mode)
			self.createNavicon();
		},
		
		createNavicon : function() {
			var self = this;
			
			self.$navicon = $("<button>",{
				"text": self.options.buttonText
			}).on("click", function(event){
				self.toggleMenuState(event);
			}).append($("<i>", {
				"class" : "icon-circle-arrow-down"
			})).prependTo(self.$elem);
		},

		toggleMenuState : function(event){
			var self = this;
			//trigger support
			(!event) ? console.log("called via trigger") : event.preventDefault();

			self.$elem.toggleClass(self.options.activeClass);
			self.$content.slideToggle();
		}


	}

	//proper way to do jQ, returns the object and lets multi instances run
	$.fn.navicon = function(options) {
		return this.each( function(){
			var _navicon = Object.create(navicon);
			
			_navicon.init(options, this);
		});
	};

	//options for extending. define defaults here
	$.fn.navicon.options = {
		accessible : true, //do we need the text for show / hide
		buttonText : "menu" //text for the button
	};
})(jQuery);



//----------------------------------------------------------------------------


// aa skip to content
var skipTo = {
	$content : {},
	$link : {},

	init : function(options){
		// get target
		skipTo.$content = $("[role='main']").attr("tabindex", -1);

		// create link
		this.insertLink();
	},
	insertLink : function(){
		skipTo.$link = $("<a>", {
			"class" : "skipTo",
			"href" : "#" + skipTo.$content.attr("id"),
			"text" : "skip to content"
		}).on("click", function(event){
			event.preventDefault();
			skipTo.$content.focus();

		// #protip: when creating DOM objects, don't forget to actually place them INTO THE DOM
		}).prependTo("div.page__header");
	}
};