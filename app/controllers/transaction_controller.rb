class TransactionController < ApplicationController
  wrap_parameters Transaction

  def list
    list = Transaction.all
    render :json => list
  end

  def show
    item = Transaction.find(params[:id])
    render :json => item
  end

  def create

    print params.to_s
    item = Transaction.new(params[:transaction])

    if item.save
      render json: item, status: :created, location: "transactions/#{item.id}"
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    item = Transaction.find(params[:id])

    if item.update_attributes(params[:transaction])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Transaction.find(params[:id])
    if item
      item.destroy
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
