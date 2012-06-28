require 'api_test_helper'

class BankTransactionApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_list_transactions
    FactoryGirl.create(:bank_transaction)
    FactoryGirl.create(:bank_transaction, amount: 250.00)

    get '/api/banks/1/transactions'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, data.length)
  end

  def test_show_transaction
    FactoryGirl.create(:bank_transaction)

    get '/api/banks/1/transactions/1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(99.99, data['amount'])
  end

  # def test_show_transaction_invalid_bank_account
  #   FactoryGirl.create(:bank_transaction)

  #   get '/api/banks/2/transactions/1'
  #   data = ActiveSupport::JSON.decode last_response.body

  #   assert_equal(false, last_response.successful?)
  #   assert_match('application/json', last_response.content_type)
  # end

  def test_create_transaction
    params = {
      bank_transaction: {
        bank_account_id: 1,
        date: Time.local(2012, 4, 16),
        amount: 55
      }
    }

    post '/api/banks/1/transactions', params
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.successful?
    assert_match('application/json', last_response.content_type)
    assert BankTransaction.find(data['id'])
  end

  def test_update_transaction
    FactoryGirl.create(:bank_transaction)
    params = {
      bank_transaction: {
        amount: 150.00
      }
    }

    put '/api/banks/1/transactions/1', params
    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(150.00, BankTransaction.find(1).amount)
  end

  def test_delete_transaction
    FactoryGirl.create(:bank_transaction)
    delete '/api/banks/1/transactions/1'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_raises ActiveRecord::RecordNotFound do
      BankTransaction.find(1)
    end
  end

  def test_valid_pagination
    bank_account = FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)

    get '/api/banks/1/transactions?page=1&per=3'
    response = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(3, response['data'].length)
    assert_equal(6, response['count'])
  end

  def test_pagination_with_query
    bank_account = FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, description: 'invoice')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, description: 'special invoice 323')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account)

    get '/api/banks/1/transactions?page=1&per=3&q=invoice'
    response = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, response['data'].length)
    assert_equal(2, response['count'])
  end

  def test_pagination_with_date_ranges
    bank_account = FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-01-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-02-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-03-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-04-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-05-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-06-01')

    get '/api/banks/1/transactions?page=1&per=3&from_date=2012-01-01&to_date=2012-03-10'
    response = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(3, response['data'].length)
    assert_equal(3, response['count'])
  end

  def test_csv_import
    bank_account = FactoryGirl.create(:bank_account)
    upload_path = File.expand_path("../../data/transactions.csv", __FILE__)
    params = {
      file: Rack::Test::UploadedFile.new(upload_path, 'application/json'),
      bank_account_id: bank_account.id
    }
    post '/api/banks/1/transactions/import', params
    assert_match('application/json', last_response.content_type)
    assert_equal(2, BankTransaction.count)
  end

  def test_csv_import_with_invalid_bank_account
    upload_path = File.expand_path("../../data/transactions.csv", __FILE__)
    params = {
      file: Rack::Test::UploadedFile.new(upload_path, 'application/json'),
      bank_account_id: 99
    }
    post '/api/banks/1/transactions/import', params
    assert_match('application/json', last_response.content_type)
    assert_equal(0, BankTransaction.count)

    data = ActiveSupport::JSON.decode last_response.body
    assert_match('item not found', data['errorMsg'])
  end

  def test_csv_import_with_missing_file
    bank_account = FactoryGirl.create(:bank_account)
    params = {
      bank_account_id: bank_account.id
    }
    post '/api/banks/1/transactions/import', params
    assert_match('application/json', last_response.content_type)
    assert_equal(0, BankTransaction.count)

    data = ActiveSupport::JSON.decode last_response.body
    assert_match('No file was uploaded', data['errors']['file'].first)
  end
end
