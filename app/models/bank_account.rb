class BankAccount < ActiveRecord::Base

  validates :bank,           :presence => true
  validates :account_number, :presence => true,
                             :numericality => true,
                             :length => { minimum: 5 }

  has_many :transactions

end
