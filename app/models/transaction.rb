class Transaction < ActiveRecord::Base
  belongs_to :account
  belongs_to :bank_account
end
