class TransactionController < ApplicationController
  wrap_parameters Transaction

  def list
    limit = params[:limit] || 20
    offset = params[:offset] || 0
    list = Transaction.limit(limit).offset(offset)
    count = Transaction.count
    render :json => {
      data: list,
      count: count
    }
  end

  def show
    item = Transaction.find_by_id(params[:id])
    render :json => item
  end

  def create
    item = Transaction.new(params[:transaction])

    if item.save
      render json: item, status: :created, location: "transactions/#{item.id}"
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    item = Transaction.find_by_id(params[:id])

    if item.update_attributes(params[:transaction])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = Transaction.find_by_id(params[:id])
    if item
      item.destroy
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end


  # TODO: cleanup ugly error handling !!
  def import
    errors = {}
    unless params[:file].respond_to?('read')
      errors['file'] = []
      errors['file'] << 'No file was uploaded'
    end

    bank_account = BankAccount.find_by_id(params[:bank_account_id])
    if bank_account
      unless errors.has_key?('file')
        begin
          imported = Transaction.import_csv(params[:file].read, bank_account)
        rescue Exception => e
          errors['file'] = [] unless errors.has_key?('file')
          errors['file'] << "#{e.message} (#{e.class.to_s})"
        end
      end
    else
      errors['bank_account_id'] = [] unless errors.has_key?('bank_account_id')
      errors['bank_account_id'] << "Could not find BankAccount with id=#{params[:bank_account]}"
    end

    if errors.length > 0
      render json: { errors: errors }, status: :unprocessable_entity
    else
      render json: { numberImported: imported }
    end
  end
end
