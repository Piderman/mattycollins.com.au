desc "create a post"
task :post, [:post__name, :isServe] do |t, args|
	# only add a post if there is a name
	if args.post__name then
		template(args.post__name)
	else
		puts "Need a post title"
	end
	
	# do we need to run jekyll?
	if args.isServe then
		# also, how do we call another task?
	end
end

desc "build the file"
def template(post__name)
	# make new post w today's date
	date = Time.new.strftime('%Y-%m-%d')
	extension = "md"
	dir = "_posts/"
	newFile = dir + date + "-#{post__name}." + extension

	if File.exists? newFile then
		puts "#{newFile} already exists. cheese it!"
		return
	end

	# file needs my "boiler plate"
	File.open(newFile, "wb") do |post|
		
		# standard header
		post.puts("---")
		post.puts("layout : default")
		post.puts("title: #{post__name}")
		post.puts("excerpt : @required")
		post.puts("comments : true")
		post.puts("---")

		# content time
		post.puts("@required intro text,")
		post.puts("<!-- /intro -->")
		post.puts("@required content")
	end

	puts "created #{post__name}.#{extension}"
end

desc "spin up jekyll"
task :jekyll do
	# need to watch jekyll

	# open up localhost too?
end