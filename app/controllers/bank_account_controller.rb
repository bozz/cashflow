class BankAccountController < ApplicationController

  def list
    list = BankAccount.all
    render :json => list
  end

  def balance
    balance = BankAccount.find(params[:id]).balance(params[:date])
    render :json => balance
  end

  def balance_range
    balance = BankAccount.find(params[:id]).balance_range(params[:from_date], params[:to_date])
    render :json => balance
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
