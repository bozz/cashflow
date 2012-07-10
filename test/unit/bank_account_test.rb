require 'unit_test_helper'

class BankAccountTest < MiniTest::Unit::TestCase

  def test_create_empty_bank_account
    bank_account = BankAccount.new
    assert_equal(false, bank_account.valid?)
    assert_raises ActiveRecord::RecordInvalid do
       bank_account.save!
    end
  end

  def test_create_valid_bank_account
    bank_account = FactoryGirl.build(:bank_account)
    assert bank_account.save!
  end

  def test_bank_required
    bank_account = FactoryGirl.build(:bank_account, bank: "")
    assert_equal(false, bank_account.valid?)
  end

  def test_account_number_required
    bank_account = FactoryGirl.build(:bank_account, account_number: "")
    assert_equal(false, bank_account.valid?)
  end

  def test_account_number_is_numeric
    bank_account = FactoryGirl.build(:bank_account, account_number: "abcdefg")
    assert_equal(false, bank_account.valid?)
  end

  def test_account_number_length
    bank_account = FactoryGirl.build(:bank_account, account_number: 111)
    assert_equal(false, bank_account.valid?)
  end

  def test_transactions_association
    bank_account = FactoryGirl.build(:bank_account)
    assert_respond_to(bank_account, :bank_transactions)
    assert_kind_of(Array, bank_account.bank_transactions)
  end

  def test_balance_with_no_transactions
    bank_account = FactoryGirl.create(:bank_account, opening_balance: 500)
    assert_equal(500.00, bank_account.balance[:amount])
  end

  def test_balance_with_transactions
    bank_account = FactoryGirl.create(:bank_account)
    create_some_transactions(bank_account)
    assert_equal(319.50, bank_account.balance[:amount])
  end

  def test_balance_with_specific_date
    bank_account = FactoryGirl.create(:bank_account)
    create_some_transactions(bank_account)
    balance = bank_account.balance('2012-05-22')
    assert_equal(69.50, balance[:amount])
  end

  def test_balance_with_invalid_dates
    bank_account = FactoryGirl.create(:bank_account)
    create_some_transactions(bank_account)

    assert_raises ApplicationController::InvalidDateError do
      bank_account.balance('2100-01-01') # future date
    end
    assert_raises ApplicationController::InvalidDateError do
      bank_account.balance('i20.20.20')
    end
    assert_raises ApplicationController::InvalidDateError do
      bank_account.balance(234234)
    end
    assert_raises ApplicationController::InvalidDateError do
      bank_account.balance('201212.15')
    end
    assert_raises ApplicationController::InvalidDateError do
      bank_account.balance('01.20.2012')
    end
  end

  def test_balance_range_with_valid_dates
    bank_account = FactoryGirl.create(:bank_account)
    create_some_transactions(bank_account)
    balance_range = bank_account.balance_range('2012-01-01', '2012-06-01')
    assert_equal(5, balance_range.length)

    balance_range = bank_account.balance_range('2012-04-01', '2012-05-21')
    assert_equal(3, balance_range.length)

    balance_range = bank_account.balance_range('2012-05-15', '2012-05-22')
    assert_equal(3, balance_range.length)
  end

  def test_balance_range_with_invalid_dates
    bank_account = FactoryGirl.create(:bank_account)
    create_some_transactions(bank_account)

    # from_date is after to_date
    balance_range = bank_account.balance_range('2012-06-01', '2012-01-01')
    assert_equal(0, balance_range.length)

    assert_raises ApplicationController::InvalidDateError do
      bank_account.balance_range('01.20.2012', '2012-01-01')
    end
    assert_raises ApplicationController::InvalidDateError do
      bank_account.balance_range('2012-01-01', 'yoyoyo')
    end
    assert_raises ArgumentError do
      bank_account.balance_range
    end
    assert_raises ArgumentError do
      bank_account.balance_range('2012-01-01')
    end
  end

  private

  def create_some_transactions(bank_account)
    FactoryGirl.create(:bank_transaction, {
      bank_account: bank_account,
      date: Date.new(2012, 5, 15),
      amount: 125.00
    })
    FactoryGirl.create(:bank_transaction, {
      bank_account: bank_account,
      date: Date.new(2012, 5, 21),
      amount: -55.50
    })
    FactoryGirl.create(:bank_transaction, {
      bank_account: bank_account,
      date: Date.new(2012, 5, 25),
      amount: 250.00
    })
  end
end
