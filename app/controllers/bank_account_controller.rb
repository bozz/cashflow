class BankAccountController < ApplicationController

  def list
    list = BankAccount.all
    render :json => list
  end

  def show
    item = BankAccount.find(params[:id])
    render :json => item
  end

end
