class Account < ActiveRecord::Base
  attr_accessible :name, :bank, :number, :description
  has_many :transactions
end
