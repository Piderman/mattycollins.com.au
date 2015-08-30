//----------------------------------------------------------------------------
// disqus
// uses the staging account and sets dev mode if on localhost
(function() {
	var isLocal = !!window.location.port,
		$comments = document.getElementById('disqus_thread'),
		disqus_shortname = 'mattycollins',
		disqus_developer = 0;

		if (isLocal) {
			disqus_developer = 1;
			disqus_shortname = 'mattycollinslocal';
		}

	if ($comments) {
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}
})();
