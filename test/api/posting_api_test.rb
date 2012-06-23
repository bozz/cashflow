require 'api_test_helper'

class PostingApiTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Cashflow::Application
  end

  def test_list_postings_for_account
    account = FactoryGirl.build(:account)
    FactoryGirl.create(:posting, account: account)
    FactoryGirl.create(:posting, account: account, amount: 500)

    get '/api/postings?account_id=1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(2, data.length)
  end

  def test_show_posting
    FactoryGirl.create(:posting)

    get '/api/postings/1'
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(140, data['amount'])
  end

  def test_create_posting
    FactoryGirl.create(:account)
    params = {
      posting: {
        account_id: 1,
        date: Time.local(2012, 7, 13),
        amount: 200.50
      }
    }

    post '/api/postings', params
    data = ActiveSupport::JSON.decode last_response.body

    assert last_response.successful?
    assert_match('application/json', last_response.content_type)
    assert Posting.find(data['id'])
  end

  def test_update_posting
    FactoryGirl.create(:posting)
    params = {
      posting: {
        amount: 99.99
      }
    }

    put '/api/postings/1', params
    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_equal(99.99, Posting.find(1).amount)
  end

  def test_delete_posting
    FactoryGirl.create(:posting)
    delete '/api/postings/1'

    assert last_response.ok?
    assert_match('application/json', last_response.content_type)
    assert_raises ActiveRecord::RecordNotFound do
      Posting.find(1)
    end
  end

end
