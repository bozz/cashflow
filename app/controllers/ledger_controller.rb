class LedgerController < ApplicationController

  def list
    list = Ledger.all
    render :json => list
  end

  def show
    item = Ledger.find(params[:id])
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
    item = Ledger.find(params[:id])

    if item.update_attributes(params[:ledger])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Ledger.find(params[:id])
    item.destroy
    render json: {}
  end
end
