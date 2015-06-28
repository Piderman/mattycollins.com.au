require 'net/ftp'
require 'rubygems'

desc "create a post"
task :post do

  # feels weird writing ["string of title"], prefer prompt
  post__name =  ask "New post title:"
  template(post__name)

  isRunSite = ask "Run site too? (y/n):"

  # post made, should we spool up the site
  if isRunSite.downcase == "y" then
    Rake::Task["local"].execute
  end
end

desc "build the file"
def template(post__name)
  # make new post w today's date
  date = Time.new.strftime('%Y-%m-%d')
  extension = "md"
  dir = "_posts/"
  fileName = post__name.downcase.gsub( /[^a-zA-Z0-9_\.]/, '-')
  newFile = dir + date + "-#{fileName}." + extension

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
    post.puts("seo__desc : seo_description")
    post.puts("seo__key : seo_keyword, search_engine_keywords")
    post.puts("---")

    # content time
    post.puts("!required intro text")
    post.puts("<!-- /intro -->")
    post.puts("\n!required content")
  end

  puts "created #{post__name}.#{extension}"

  # open file and start writing?
  sh "subl -w #{newFile}:12"
end
