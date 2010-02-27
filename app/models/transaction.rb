class Transaction < ActiveRecord::Base
  attr_accessible :account_id, :date, :description, :amount, :note, :tag_list
  validates_presence_of :date, :amount
  
  belongs_to :account
  acts_as_taggable_on :tags
end
