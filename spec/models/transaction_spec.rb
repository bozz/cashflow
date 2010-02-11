require File.dirname(__FILE__) + '/../spec_helper'

describe Transaction do
  it "should succeed creating a new :valid_transaction from the Factory" do
    Factory.create(:valid_transaction)
  end

  it "should invalid :invalid_transaction factory" do
    Factory.build(:invalid_transaction).should be_invalid
  end
end
