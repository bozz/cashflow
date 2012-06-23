class LedgerController < ApplicationController

  def list
    list = Ledger.all
    render :json => list
  end

  def show
    item = Ledger.find_by_id(params[:id])
    render :json => item
  end

  def create
    item = Ledger.new(params[:ledger])

    if item.save
      render json: item, status: :created, location: "ledgers/#{item.id}"
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    item = Ledger.find_by_id(params[:id])

    if item.update_attributes(params[:ledger])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Ledger.find_by_id(params[:id])
    if item
      item.destroy
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
