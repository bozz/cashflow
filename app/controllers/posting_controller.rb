class PostingController < ApplicationController

  def list
    if params.has_key?(:account_id)
      list = Posting.where("account_id=?", params['account_id'])
      render :json => list
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def show
    item = Posting.find_by_id(params[:id])
    if item
      render :json => item
    else
      render json: item.errors, status: :unprocessable_entity
    end
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
    item = Posting.find_by_id(params[:id])

    if item.update_attributes(params[:posting])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Posting.find_by_id(params[:id])
    if item
      item.destroy
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
