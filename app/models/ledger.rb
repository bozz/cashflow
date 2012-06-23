class Ledger < ActiveRecord::Base

  has_many :accounts

  validates :name, :presence => true

end
