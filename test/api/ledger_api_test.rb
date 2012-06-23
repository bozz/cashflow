require 'api_test_helper'

class LedgerApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_list_ledgers
    FactoryGirl.create(:ledger)
    FactoryGirl.create(:ledger, name: "Another Ledger")

    get '/api/ledgers'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, data.length)
  end

  def test_show_ledger
    FactoryGirl.create(:ledger)

    get '/api/ledgers/1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal('Business', data['name'])
  end

  def test_create_ledger
    params = {
      ledger: {
        name: "Private Ledger"
      }
    }

    post '/api/ledgers', params
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.successful?
    assert_match('application/json', last_response.content_type)
    assert Ledger.find(data['id'])
  end

  def test_update_ledger
    FactoryGirl.create(:ledger)
    params = {
      ledger: {
        name: "Updated Name"
      }
    }

    put '/api/ledgers/1', params
    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal("Updated Name", Ledger.find(1).name)
  end

  def test_delete_ledger
    FactoryGirl.create(:ledger)
    delete '/api/ledgers/1'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_raises ActiveRecord::RecordNotFound do
      Ledger.find(1)
    end
  end

end
