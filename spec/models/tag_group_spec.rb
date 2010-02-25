require File.dirname(__FILE__) + '/../spec_helper'

describe TagGroup do
  it "should be valid" do
    TagGroup.new.should be_valid
  end
end
