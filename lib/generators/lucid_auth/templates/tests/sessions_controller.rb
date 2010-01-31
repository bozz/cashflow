require 'spec_helper'
 
describe <%= session_plural_class_name %>Controller do
  #Delete this example and add some real ones
  it "should use UserSessionsController" do
    controller.should be_an_instance_of(<%= session_plural_class_name %>Controller)
  end
end
