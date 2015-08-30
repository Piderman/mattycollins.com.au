---
title: Dat workflow
excerpt : My first attempt at automation with rake
category : the-making-of
tags :
- rake
- ruby
- automation
- profanities
comments : true
seo__desc : A look through my jekyll workflow for create a new post
seo__key : rake, jekyll, automation, new post
related : jekyll up and running
icons :
- code
- info
---
An *interesting* look through my jekyll workflow of creating a new entry ala [Thug Kitchen](http://thugkitchen.com/)
<!-- /intro -->

Creating a new post? Lets gather what we will need before we even put <del>pen</del> hand to keyboard:

* today's date
* post title
* `YAML` properties
* awkward as fuck file name

Ain't nobody got time for that.

## rake post
{% highlight ruby  %}
task :post do
  post__name =  ask "New post title:"
  template(post__name)
  # ...
end
{% endhighlight %}

This fucker is so minimal he don't even need arguments. `post__name` comes up in this handy ass prompt. Simple as shit command line input, hells yeah. Quicker than you can hit 'enter', `template(post__name)` has already been called to drop some efficiency on your punk ass.


### template(post__name)
{% highlight ruby  %}
def template(post__name)
  date = Time.new.strftime('%Y-%m-%d')
  extension = "md"
  dir = "_posts/"
  fileName = post__name.downcase.gsub( /[^a-zA-Z0-9_\.]/, '-')
  newFile = dir + date + "-#{fileName}." + extension

  if File.exists? newFile then
    puts "#{newFile} already exists. cheese it!"
    return
  end
  #...
{% endhighlight %}

Creating files like a fucking bawse. He takes your `post__name`, drops a fucking `downcase` on him while making it a valid web address[^1]. Multi-talented shit right there. Don't even worry about making the same post twice, this crafty fucker has your back.

{% highlight ruby  %}
  #...
  File.open(newFile, "wb") do |post|
    post.puts("---")
    post.puts("layout : default")
    post.puts("title: #{post__name}")
    post.puts("excerpt : !required")
    post.puts("comments : true")
    post.puts("---")
    post.puts("!required intro text")
    post.puts("<!-- /intro -->")
    post.puts("\n!required content")
  end
end
{% endhighlight %}

Whoa, where are you going? Shit hasn't even started to get real. Mother effing boilerplate is what's going on here. Son this function lives for that shit. Gets some scaffolding all up your face, ready for some mad blogging to go down.

Better find that file and open your text editor. Wat, hells no! Back the fuck up now. `sh "subl -w #{newFile}:10"` opens sublime with your newly created post in a flash. You're fucking welcome. Write the shit out of that post, save and close. BAM! Instantly back in the terminal. Hardcore shit right there if you ask me.

## Back to rake post
{% highlight ruby  %}
#...
isRunSite = ask "Run site too? (y/n):"
if isRunSite.downcase == "y" then
  Rake::Task["local"].execute
end
{% endhighlight %}

All this and we are only up to the third line of `:post`. This son of a bitch has one more card to play. Another terminal prompt, answer with a mother fucking <q>yes</q> and your wish of more automation shall be granted. `rake local` steps in to build the site for your lazy ass. Evens open the damn browser for you. Respect.

An entire post created by simply runing one `rake post`[^2]

Efficient. As. Fuck.

[^1]: Literally pulled from [David Lynch's](https://github.com/kemayo/davidlynch.org/blob/master/Rakefile#L55) work
[^2]: The [rake file](https://github.com/Piderman/mattycollins.com.au/blob/master/Rakefile#L6) can be seen in full on the githubs