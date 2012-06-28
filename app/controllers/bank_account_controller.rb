class BankAccountController < ApplicationController

  def list
    list = BankAccount.all
    render :json => list
  end

  def balance
    balance = BankAccount.find(params[:id]).balance
    render :json => {
      amount: balance.dollars,
      cents:  balance.cents,
      currency: balance.currency.iso_code
    }
  end

  def show
    item = BankAccount.find(params[:id])
    render :json => item
  end

  def create
    item = BankAccount.new(params[:bank_account])

    if item.save
      render json: item, status: :created, location: "bank-accounts/#{item.id}"
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    item = BankAccount.find(params[:id])

    if item.update_attributes(params[:bank_account])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = BankAccount.find(params[:id])
    if item
      item.destroy
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
