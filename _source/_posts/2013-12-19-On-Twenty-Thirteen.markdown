---
title: On Twenty Thirteen
excerpt : From now on we're spelling everything with letters!
comments : true
seo__desc : Looking back on tools that had impacted my 2013
seo__key : web dev tools, developer tools, workflow, 2013, review
---
Brace yourself, its another <q>year in review</q> post. A look back at the emotional roller-coaster that was 2013. Enjoy!
<!-- /intro -->

## Sublime Text 2
This year I committed myself to using Sublime Text 2 as my full time editor. While I was using it periodically before, I was tied down to Visual Studio for full time work requirements. However thanks to the TFS plug-in I literally now only use Visual Studio to run sites locally.

Multiple cursors, find in files, amazing commands, I could go on&hellip; and will!

### Goto anything
Goto anything has basically rendered the sidebar / knowing file structure obsolete and made working in a team so much quicker. Type `command + P`
to bring it up, from there you can fuzzy search for files like `vend/flex.cs` to find `/themes/vendors/flexslider/flexslider.css` with only a general understanding of structure needed.

Front-end debugging is now faster as I can use `fileName@selector` or even `fileName:lineNumber` to take me to the exact location. Sourcemaps for Sass helps a great deal with this too as I can find the issue in the inspecter and instantly find the spot to make the change.

### Customisation
You can change just about anything in Sublime. I didn't like the syntax highlighter for CSS / Sass so I changed it. (<cite>Twilight</cite> for HTML/JS, <cite>Tron</cite> for Sass). Just about anything can be changed including key bindings.

Snippets have removed a lot of redundant typing for me and are very simple to create or even download via <cite>Package Control</cite>. I don't know the syntax of a `for` loop anymore and that's fine. `for[tab]` will print it out and I don't need to have broken code for something stupid like a syntax error or look it up each time[^1].

## The Command Line
I hated this guy, still terrible at it but I'm getting there. Two main problems I've had this year have been solved by it. Sass was bugging out on me due to Windows environment and third-party extensions crashing. But learning the basics, and I mean basics: I can only add the sourcemap or output style flags, meant I had a working version of Sass with access to all the features without any restricted implementations of other vendors.

Jumping the gun on pre-release sourcemaps for Sass was totally worth it as any complexity that partials and mixins added by Sass were removed. Sass without sourcemaps can be a nightmare and without well-documented code you could be searching through compiled code for ever.

I am running Git on the command line too now and can really see the advantages it gives you. Again I have only a basic understanding but it means I can resolve errors and continue working, as opposed to GUI apps that have limited functionality[^2].

## Sass
Well any preprocessor really. This has lead to a more maintainable and modular development mentality as I can be focused on communication and readability of my working files and not worry about the size of the output. Sass has meant I can:

* bring common solutions/rules from project to project
* maintain consistent designs using variables for colors, gutters and fonts
* comment to my heart's content and output a compact one-line file
* working in smaller, maintainable files vs 3,000 + lines of madness in a single file

I could go on and on about Sass&hellip;

## Skype
Random one here. My sister moved to Queensland and Skype meant I could easily keep in touch with her. Skype has also allowed me to communicate with other devs and friends, sharing our knowledge and misc. ramblings through the week. <cite>Bidness Bawses&trade;</cite> has taught me a lot this year on how to be a better developer and person, as well as brightening the sometimes dull office days.

## Open Source
While I haven't gotten as involved in as many projects as I'd like to, Open Source is truly amazing. I have been able to learn and share code with others in a way that I didn't think was possible. I really enjoy how much this industry wants to share knowledge with others instead of holding onto trade secrets and protecting IP.

## Conclusion
Thanks for taking interest in some of my personal highlights for the year. I am very excited for what 2014 brings!


[^1]: Yes, I could memorise it but it's subtly different across languages. As a developer I prefer to focus on *why* a loop is used and its limitations, not *how* to type it. It's less to write for me and it does the job more efficiently so I'd say that's a win.
[^2]: I do recommend using a GUI for an intro into Git though. Start of with some theory and then use a GUI until you understand what Git is doing before jumping in.

