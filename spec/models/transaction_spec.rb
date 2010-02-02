require File.dirname(__FILE__) + '/../spec_helper'

describe Transaction do
  it "should be valid" do
    Transaction.new.should be_valid
  end
end
