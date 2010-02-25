class Account < ActiveRecord::Base
  has_and_belongs_to_many :reports
  attr_accessible :name, :bank, :number, :description
  has_many :transactions
  
  validates_presence_of :name
end
