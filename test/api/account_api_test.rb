require 'api_test_helper'

class AccountApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_list_accounts
    ledger = FactoryGirl.build(:ledger)
    FactoryGirl.create(:account, ledger: ledger)
    FactoryGirl.create(:account, ledger: ledger, identifier: "1600")

    get '/api/accounts?ledger_id=1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, data.length)
  end

  def test_list_accounts_with_missing_ledger_id
    ledger = FactoryGirl.build(:ledger)
    FactoryGirl.create(:account, ledger: ledger)
    FactoryGirl.create(:account, ledger: ledger, identifier: "1600")

    get '/api/accounts'
    data = ActiveSupport::JSON.decode last_response.body

    assert_equal(false, last_response.successful?)
    assert_match('application/json', last_response.content_type)
    assert_equal(0, data.length)
  end

  def test_show_account
    FactoryGirl.create(:account)

    get '/api/accounts/1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal("1200", data['identifier'])
  end

  def test_show_nonexisting_account
    FactoryGirl.create(:account)

    get '/api/accounts/4'
    data = ActiveSupport::JSON.decode last_response.body

    assert_equal(false, last_response.successful?)
    assert_match('application/json', last_response.content_type)
  end

  def test_create_account
    FactoryGirl.create(:ledger)
    params = {
      account: {
        ledger_id: 1,
        name: "New Account",
        identifier: "1400",
        description: "real new"
      }
    }

    post '/api/accounts', params
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.successful?
    assert_match('application/json', last_response.content_type)
    assert Account.find(data['id'])
  end

  def test_update_account
    FactoryGirl.create(:account)
    params = {
      account: {
        name: "Updated Name"
      }
    }

    put '/api/accounts/1', params
    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal("Updated Name", Account.find(1).name)
  end

  def test_delete_account
    FactoryGirl.create(:account)
    delete '/api/accounts/1'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_raises ActiveRecord::RecordNotFound do
      Account.find(1)
    end
  end
end
