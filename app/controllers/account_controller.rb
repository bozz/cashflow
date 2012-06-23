class AccountController < ApplicationController

  def list
    if params.has_key?(:ledger_id)
      list = Account.where("ledger_id=?", params[:ledger_id])
      render :json => list
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def show
    item = Account.find_by_id(params[:id])
    if item
      render :json => item
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def create
    item = Account.new(params[:account])
    item['ledger_id'] = params['ledger_id']

    if item.save
      render json: item, status: :created, location: "accounts/#{item.id}"
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    item = Account.find_by_id(params[:id])

    if item.update_attributes(params[:account])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Account.find_by_id(params[:id])
    if item
      item.destroy
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
