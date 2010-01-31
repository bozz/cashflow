require File.expand_path(File.dirname(__FILE__) + "/lib/insert_commands.rb")
class LucidAuthGenerator < Rails::Generator::Base
  attr_accessor :user_name, :session_name
  
  def initialize(runtime_args, runtime_options = {})
    super
    
    @user_name = @args[0] || 'user'
    @session_name = @args[1] || @user_name + '_session'
  end
  
  def manifest
    record do |m|
      m.directory "app/models"
      m.directory "app/controllers"
      m.directory "app/helpers"
      m.directory "app/views"
      m.directory "lib"
      
      m.directory "app/views/#{user_plural_name}"
      m.template "user.rb", "app/models/#{user_singular_name}.rb"
      m.template "authlogic_session.rb", "app/models/#{session_singular_name}.rb"
      m.template "users_controller.rb", "app/controllers/#{user_plural_name}_controller.rb"
      m.template "users_helper.rb", "app/helpers/#{user_plural_name}_helper.rb"
      m.template "views/signup.html.erb", "app/views/#{user_plural_name}/new.html.erb"
      
      m.directory "app/views/#{session_plural_name}"
      m.template "sessions_controller.rb", "app/controllers/#{session_plural_name}_controller.rb"
      m.template "sessions_helper.rb", "app/helpers/#{session_plural_name}_helper.rb"
      m.template "views/login.html.erb", "app/views/#{session_plural_name}/new.html.erb"
      
      m.template "authentication.rb", "lib/authentication.rb"
      m.migration_template "migration.rb", "db/migrate", :migration_file_name => "create_#{user_plural_name}"
      
      m.route_resources user_plural_name
      m.route_resources session_plural_name
      m.route_name :login, 'login', :controller => session_plural_name, :action => 'new'
      m.route_name :logout, 'logout', :controller => session_plural_name, :action => 'destroy'
      m.route_name :signup, 'signup', :controller => user_plural_name, :action => 'new'
      
      m.insert_into "app/controllers/#{application_controller_name}.rb", 'include Authentication'
      
      m.directory "spec"
      m.directory "spec/fixtures"
      m.directory "spec/controllers"
      m.directory "spec/models"
      m.directory "spec/factories"
      m.template "tests/user.rb", "spec/models/#{user_singular_name}_spec.rb"
      m.template "tests/users_controller.rb", "spec/controllers/#{user_plural_name}_controller_spec.rb"
      m.template "tests/sessions_controller.rb", "spec/controllers/#{session_plural_name}_controller_spec.rb"
      m.template "factories/users.rb", "spec/factories/#{user_plural_name}.rb"
      
      m.insert_into "app/spec/spec_helper.rb", "require 'factory_girl'"
      m.insert_into "app/spec/spec_helper.rb", "Factory.find_definitions"
    end
  end
  
  def user_singular_name
    user_name.underscore
  end
  
  def user_plural_name
    user_singular_name.pluralize
  end

  def user_class_name
    user_name.camelize
  end
  
  def user_plural_class_name
    user_plural_name.camelize
  end
  
  def session_singular_name
    session_name.underscore
  end
  
  def session_plural_name
    session_singular_name.pluralize
  end

  def session_class_name
    session_name.camelize
  end
  
  def session_plural_class_name
    session_plural_name.camelize
  end
  
  def application_controller_name
    Rails.version >= '2.3.0' ? 'application_controller' : 'application'
  end

protected
  
  def test_framework
    options[:test_framework] ||= File.exist?(destination_path("spec")) ? :rspec : :testunit
  end
  
  def add_options!(opt)
    opt.separator ''
    opt.separator 'Options:'
  end
  
  def banner
    <<-EOS
Creates user model and controllers to handle registration and authentication.

USAGE: #{$0} #{spec.name} [user_name] [sessions_controller_name]
EOS
  end
end
