ENV["RAILS_ENV"] = "test"
require File.expand_path("../../config/environment", __FILE__)
require "minitest/autorun"
require "rack/test"

# Turn.config.format = :outline

require 'database_cleaner'
DatabaseCleaner.strategy = :truncation
class MiniTest::Unit::TestCase
  def setup
    DatabaseCleaner.clean
  end
end
