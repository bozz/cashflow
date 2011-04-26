class TransactionsController < ApplicationController

  respond_to :json

  # GET /transactions
  def index
    @transactions = Transaction.all
    render :json => @transactions
  end

  # GET /transactions/1
  def show
    @transaction = Transaction.find(params[:id])
    render :json => @transaction
  end

  # POST /transactions
  def create
    transaction = Transaction.create! params[:transaction]
    render :json => transaction
  end

  # PUT /transactions/1
  def update
    @transaction = Transaction.find(params[:id])

    if @transaction.update_attributes(params[:transaction])
      render :json => @transaction
    else
      render :json => { :success => false }
    end
  end

  # DELETE /transactions/1
  def destroy
    @transaction = Transaction.find(params[:id])
    @transaction.destroy
    render :json => { :success => true }
  end
end
