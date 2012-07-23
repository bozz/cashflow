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

  desc "Run Testem for javascript tests"
  task :js do
    exec "testem -f test/javascripts/testem.yml"
  end

end

task :default => 'test:unit'
