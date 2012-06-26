class MainController < ApplicationController
  def index
    # bootstrap app with the following data
    @accounts = Account.order('identifier')
    @bank_accounts = BankAccount.all
  end
end
