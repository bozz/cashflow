require File.dirname(__FILE__) + '/../spec_helper'

describe Account do
  it "should succeed creating a new :account from the Factory" do
    Factory.create(:account).should be_valid
  end
end
