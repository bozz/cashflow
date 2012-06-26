class BankTransactionController < ApplicationController
  wrap_parameters BankTransaction

  def list
    bank_id = params.fetch(:bank_id) { raise ApplicationController::MissingParameterError.new('ledger_id')  }
    list = BankTransaction.find_all_by_bank(bank_id).order(params[:order]).page(params[:page]).per(params[:per])
    count = BankTransaction.count
    render :json => {
      data: list,
      count: count
    }
  end

  def show
    item = BankTransaction.withIdAndBankAccount(params[:id], params[:bank_id]).first
    if item
      render json: item
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def create
    item = BankTransaction.new(params[:bank_transaction])
    item['bank_account_id'] = params[:bank_id];

    if item.save
      render json: item, status: :created, location: "bank-transactions/#{item.id}"
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    item = BankTransaction.withIdAndBankAccount(params[:id], params[:bank_id]).first

    if item.update_attributes(params[:bank_transaction])
      render json: item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def delete
    item = BankTransaction.withIdAndBankAccount(params[:id], params[:bank_id]).first
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

    bank_account = BankAccount.find_by_id(params[:bank_id])
    if bank_account
      unless errors.has_key?('file')
        begin
          imported = BankTransaction.import_csv(params[:file].read, bank_account)
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
