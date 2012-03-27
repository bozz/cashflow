require "rake/testtask"

namespace :test do

  Rake::TestTask.new(:unit => "db:test:prepare") do |t|
    t.libs << "test"
    t.pattern = "test/unit/**/*_test.rb"
  end

  Rake::TestTask.new(:api => "db:test:prepare") do |t|
    t.libs << "test"
    t.pattern = "test/api/**/*_test.rb"
  end

end

task :default => 'test:unit'
