class ApplicationController < ActionController::Base
  protect_from_forgery

  class MissingParameterError < StandardError; end;

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: {errorMsg: "item not found"}, status: :not_found
  end

  rescue_from ApplicationController::MissingParameterError do |e|
    render json: {errorMsg: "missing required parameter: #{e}"}, status: :bad_request
  end

end
