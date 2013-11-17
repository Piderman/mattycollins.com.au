desc "create a post"
task :post, [:post__name] do |t, args|
  # only add a post if there is a name
  if args.post__name then
    template(args.post__name)
  else
    puts "Need a post title"
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
    post.puts("excerpt : !required")
    post.puts("comments : true")
    post.puts("---")

    # content time
    post.puts("!required intro text")
    post.puts("<!-- /intro -->")
    post.puts("\n!required content")
  end

  puts "created #{post__name}.#{extension}"

  # open file and start writing?
  sh "subl -w #{newFile}:10"
end

desc "working on the site mode"
task :local do

  # see https://github.com/mojombo/jekyll/blob/master/Rakefile#L142
  Thread.new do
    sleep 4
    # sh "start http://localhost:4000"
    sh "open http://localhost:4000"
  end


  # need to watch jekyll and le sass
  sh "jekyll serve --watch --draft & sass --watch --sourcemap giraffe/styles:giraffe/styles &"
end

desc "ready for production code"
task :live do

  dir = "giraffe/styles/"
  nomedia = dir + "nomedia.css.map"
  screen = dir + "screen.css.map"
  
  if File.exists? nomedia then
    File.delete(nomedia)
  end

  if File.exists? screen then
    File.delete(screen)
  end

  puts "compressing sass..."
  sh "sass --force --update giraffe/styles:giraffe/styles --style compressed"

  puts "...rebuilding Jekyll..."
  sh "jekyll build"

  puts "\nReady for commit!"
  # post-hook something now?
end
