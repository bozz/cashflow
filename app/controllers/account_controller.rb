class AccountController < ApplicationController

  def list
    list = Account.all
    render :json => list
  end

  def show
    item = Account.find(params[:id])
    render :json => item
  end

  def create
    item = Account.new(params[:account])

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
    if item
      item.destroy
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
