class PostingController < ApplicationController

  def list
    account_id = params.fetch(:account_id) { raise ApplicationController::MissingParameterError.new('account_id')  }

    list = Posting.find_all_by_account(account_id)
    render json: list
  end

  def show
    item = Posting.find(params[:id])
    render :json => item
  end

  def create
    item = Posting.new(params[:posting])

    if item.save
      render json: item, status: :created, location: "postings/#{item.id}"
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    item = Posting.find(params[:id])

    if item.update_attributes(params[:posting])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Posting.find(params[:id])
    item.destroy
    render json: {}
  end
end
