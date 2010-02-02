class Transaction < ActiveRecord::Base
  attr_accessible :account_id, :date, :description, :amount, :note
  belongs_to :account
  acts_as_taggable_on :tags
  
  validates_presence_of :date, :amount
end
