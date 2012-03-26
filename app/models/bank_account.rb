class BankAccount < ActiveRecord::Base

  has_many :transactions

  validates :bank,           :presence => true
  validates :account_number, :presence => true,
                             :numericality => true,
                             :length => { minimum: 5 }

end
