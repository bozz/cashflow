require 'api_test_helper'

class BankAccountApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_root_url
    get '/'
    assert last_response.ok?
  end

  def test_list_bank_accounts
    FactoryGirl.create(:bank_account)
    FactoryGirl.create(:bank_account, bank: "AnotherBank")

    get '/bank-accounts'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)

    data = ActiveSupport::JSON.decode last_response.body
    assert_equal(2, data.length)
  end

  def test_show_bank_account
    FactoryGirl.create(:bank_account)

    get '/bank-accounts/1'
    assert last_response.ok?
  end
end
