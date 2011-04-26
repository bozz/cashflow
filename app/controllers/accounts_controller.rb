class AccountsController < ApplicationController

  respond_to :json

  # GET /accounts
  def index
    @accounts = Account.all
    render :json => @accounts
  end

  # GET /accounts/1
  def show
    @account = Account.find(params[:id])
    render :json => @account
  end

  # POST /accounts
  def create
    @account = Account.create!(params[:account])
    render :json => @account
  end

  # PUT /accounts/1
  def update
    @account = Account.find(params[:id])

    if @account.update_attributes(params[:account])
      render :json => @account
    else
      render :json => { :success => false }
    end
  end

  # DELETE /accounts/1
  def destroy
    @account = Account.find(params[:id])
    @account.destroy
    render :json => { :success => true }
  end
end
