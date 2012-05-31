require 'unit_test_helper'

class AccountTest < MiniTest::Unit::TestCase

  def test_create_empty_account
    account = Account.new
    assert_equal(false, account.valid?)
    assert_raises ActiveRecord::RecordInvalid do
       account.save!
    end
  end

  def test_create_valid_account
    account = FactoryGirl.build(:account)
    assert account.save!
  end

  def test_name_required
    account = FactoryGirl.build(:account, name: "")
    assert_equal(false, account.valid?)
  end

  def test_identifier_required
    account = FactoryGirl.build(:account, identifier: "")
    assert_equal(false, account.valid?)
  end

  def test_account_identifier_is_numeric
    account = FactoryGirl.build(:account, identifier: "abcdefg")
    assert_equal(false, account.valid?)
  end

  def test_account_invalid_identifier_length
    account = FactoryGirl.build(:account, identifier: 111)
    assert_equal(false, account.valid?)
  end

  def test_account_valid_identifier_length
    account = FactoryGirl.build(:account, identifier: 1800)
    assert_equal(true, account.valid?)
  end
end
