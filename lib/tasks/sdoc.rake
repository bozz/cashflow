# Use 'sdoc' for generating rdocs (much nicer...)
require 'sdoc' # and use your RDoc task the same way you used it before

Rake::RDocTask.new do |rdoc|
  rdoc.rdoc_dir = 'doc/rdoc'
  rdoc.options << '--fmt' << 'shtml' # explictly set shtml generator
  rdoc.template = 'direct' # lighter template used on railsapi.com
end