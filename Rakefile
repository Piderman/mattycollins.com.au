require 'net/ftp'
require 'rubygems'
require 'highline/import'

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

# using highline to protect input of login deets
def get_password(prompt="FTP Password:")
   ask(prompt) {|q| q.echo = false}
end


desc "push through toomey"
task :push do

  # don't save your FTP login here, that could be hawkward o.O
  domain = "ftp.mattycollins.com.au"
  password = get_password()

  # testing w drafts first :|
  drafts = Dir.glob("_drafts/*").sort

  # http://stackoverflow.com/questions/16970653/is-it-possible-to-transfer-the-contents-of-a-whole-directory-using-the-built-in?rq=1
  # Net::FTP.open(domain, "jekyll@mattycollins.com.au", password) do |ftp|
  #   drafts.each do |name|
  #     if File::directory? name
  #       ftp.mkdir(name)
  #     else
  #       File.open(name) { |file| ftp.putbinaryfile(file, name) }
  #     end
  #   end
  # end
end
