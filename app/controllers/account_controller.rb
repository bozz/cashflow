class AccountController < ApplicationController

  def list
    ledger_id = params.fetch(:ledger_id) { raise ApplicationController::MissingParameterError.new('ledger_id')  }

    list = Account.find_all_by_ledger(ledger_id)
    render :json => list
  end

  def show
    item = Account.find(params[:id])
    render :json => item
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
    item = Account.find(params[:id])

    if item.update_attributes(params[:account])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Account.find(params[:id])
    item.destroy
    render json: {}
  end
end
