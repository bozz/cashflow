class Transaction < ActiveRecord::Base
  attr_accessible :account_id, :date, :description, :amount, :note
  validates_presence_of :date, :amount
  
  belongs_to :account
  acts_as_taggable_on :tags
end
