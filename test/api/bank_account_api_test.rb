require 'api_test_helper'

class BankAccountApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_list_bank_accounts
    FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_account, bank: "AnotherBank")

    get '/api/banks'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, data.length)
  end

  def test_get_account_balance
    bank_account = FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-01-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-02-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-03-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-04-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-05-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-06-01')

    get '/api/banks/1/balance'
    response = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(1, response.length)
    assert_equal(Time.now.strftime("%Y-%m-%d"), response.first['date'])
    assert_equal(599.94, response.first['amount'])
    assert_equal(59994, response.first['cents'])
    assert_equal("EUR", response.first['currency'])
  end

  def test_get_account_balance_on_date
    bank_account = FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-01-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-02-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-03-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-04-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-05-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-06-01')

    get '/api/banks/1/balance?date=2012-03-15'
    response = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(1, response.length)
    assert_equal('2012-03-15', response.first['date'])
    assert_equal(299.97, response.first['amount'])
    assert_equal(29997, response.first['cents'])
    assert_equal("EUR", response.first['currency'])
  end

  def test_get_account_balance_within_date_range
    bank_account = FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-01-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-02-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-03-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-04-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-05-01')
    FactoryGirl.create(:bank_transaction, bank_account: bank_account, date: '2012-06-01')

    get '/api/banks/1/balance?from_date=2012-01-01&date=2012-03-10'
    response = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(3, response.length)
    assert_equal(99.99, response.first['amount'])
  end

  def test_show_bank_account
    FactoryGirl.create(:bank_account)

    get '/api/banks/1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal('BigBank', data['bank'])
  end

  def test_create_bank_account
    params = {
      bank_account: {
        name: "El Banko",
        bank: "El Banko",
        account_number: 222222
      }
    }

    post '/api/banks', params
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.successful?
    assert_match('application/json', last_response.content_type)
    assert BankAccount.find(data['id'])
  end

  def test_update_bank_account
    FactoryGirl.create(:bank_account)
    params = {
      bank_account: {
        name: "Updated Name"
      }
    }

    put '/api/banks/1', params
    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal("Updated Name", BankAccount.find(1).name)
  end

  def test_delete_bank_account
    FactoryGirl.create(:bank_account)
    delete '/api/banks/1'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_raises ActiveRecord::RecordNotFound do
      BankAccount.find(1)
    end
  end

  # def test_balance
  #   FactoryGirl.create(:bank_account)
  #   FactoryGirl.create(:transaction, amount: 125.00)
  #   FactoryGirl.create(:transaction, amount: -55.50)
  #   FactoryGirl.create(:transaction, amount: 250.00)

  #   get 'api/bank-accounts/1/balance'
  #   data = ActiveSupport::JSON.decode last_response.body

  #   assert last_response.ok?
  #   assert_match('application/json', last_response.content_type)
  #   assert_equal('450.50', data.balance)
  # end
end
