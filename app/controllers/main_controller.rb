class MainController < ApplicationController
  def index
    # bootstrap app with the following data
    @accounts = Account.all
    @bank_accounts = BankAccount.all
    @transactions = Transaction.order('date')
  end
end
