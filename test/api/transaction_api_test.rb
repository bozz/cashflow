require 'api_test_helper'

class TransactionApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_list_transactions
    FactoryGirl.create(:transaction)
    FactoryGirl.create(:transaction, amount: 250.00)

    get '/transactions'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, data.length)
  end

  def test_show_transaction
    FactoryGirl.create(:transaction)

    get '/transactions/1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(99.99, data['amount'])
  end

  def test_create_transaction
    params = {
      transaction: {
        bank_account_id: 1,
        date: Time.local(2012, 4, 16),
        amount: 55
      }
    }

    post '/transactions', params
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.successful?
    assert_match('application/json', last_response.content_type)
    assert Transaction.find(data['id'])
  end

  def test_update_transaction
    FactoryGirl.create(:transaction)
    params = {
      transaction: {
        amount: 150.00
      }
    }

    put '/transactions/1', params
    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(150.00, Transaction.find(1).amount)
  end

  def test_delete_transaction
    FactoryGirl.create(:transaction)
    delete 'transactions/1'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_raises ActiveRecord::RecordNotFound do
      Transaction.find(1)
    end
  end
end
