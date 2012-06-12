class MainController < ApplicationController
  def index
    # bootstrap app with the following data
    @accounts = Account.order('identifier')
    @bank_accounts = BankAccount.all
    @transactions = BankTransaction.order('date DESC')
  end
end
