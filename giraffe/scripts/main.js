(function(){
	$(".navigation--site").navicon();

	skipTo.init();
})();


//pygments be broken, look for code highlight blocks
(function($, undefined) {
	var fauxHighlight = {
		init : function() {
			fauxHighlight.$code = $(".t-copy pre code[class]");
			fauxHighlight.$codeBlock = fauxHighlight.$code.closest("div");

			fauxHighlight.attachedInfo();
		},

		attachedInfo : function(){
			fauxHighlight.$codeBlock.each(function(index){
				var $current = $(this);
					currentLanguage = fauxHighlight.$code.eq(index).attr("class");
				
				$current.addClass("fauxHighlight").attr("data-lang", currentLanguage);
			});
		}
	}

	fauxHighlight.init();
})(jQuery);