require File.dirname(__FILE__) + '/../spec_helper'

describe Report do
  it "should succeed creating a new :report from the Factory" do
    Factory.create(:report).should be_valid
  end
end
