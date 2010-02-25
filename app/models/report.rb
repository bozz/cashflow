class Report < ActiveRecord::Base
  attr_accessible :name, :type, :chart_type, :beginning_at, :ending_at, :account_ids
  validates_presence_of :name, :account_ids
  has_and_belongs_to_many :accounts
end
