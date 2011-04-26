class BankAccount < ActiveRecord::Base
  has_many :transactions
end
