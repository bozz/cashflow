require 'api_test_helper'

class BankAccountApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_list_bank_accounts
    FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_account, bank: "AnotherBank")

    get '/bank-accounts'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, data.length)
  end

  def test_show_bank_account
    FactoryGirl.create(:bank_account)

    get '/bank-accounts/1'
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

    post '/bank-accounts', params
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

    put '/bank-accounts/1', params
    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal("Updated Name", BankAccount.find(1).name)
  end

  def test_delete_bank_account
    FactoryGirl.create(:bank_account)
    delete 'bank-accounts/1'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_raises ActiveRecord::RecordNotFound do
      BankAccount.find(1)
    end
  end
end
