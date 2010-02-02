class TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all
  end
  
  def show
    @transaction = Transaction.find(params[:id])
  end
  
  def new
    @transaction = Transaction.new
  end
  
  def create
    @transaction = Transaction.new(params[:transaction])
    if @transaction.save
      flash[:notice] = "Successfully created transaction."
      redirect_to @transaction
    else
      render :action => 'new'
    end
  end
  
  def edit
    @transaction = Transaction.find(params[:id])
  end
  
  def update
    @transaction = Transaction.find(params[:id])
    if @transaction.update_attributes(params[:transaction])
      flash[:notice] = "Successfully updated transaction."
      redirect_to @transaction
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @transaction = Transaction.find(params[:id])
    @transaction.destroy
    flash[:notice] = "Successfully destroyed transaction."
    redirect_to transactions_url
  end
end
