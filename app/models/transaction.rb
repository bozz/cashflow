class Transaction < ActiveRecord::Base
  belongs_to :account
  belongs_to :bank_account

  def account_name
    self.account.name
  end

  def bank_account_name
    self.bank_account.name
  end

  def as_json(options={})
    super(:methods => [:account_name, :bank_account_name])
  end
end
