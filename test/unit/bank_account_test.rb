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
    assert_respond_to(bank_account, :transactions)
    assert_kind_of(Array, bank_account.transactions)
  end

  def test_balance_with_no_transactions
    bank_account = FactoryGirl.create(:bank_account, opening_balance: 500)
    assert_equal(500.00, bank_account.balance)
  end

  def test_balance_with_transactions
    bank_account = FactoryGirl.create(:bank_account)
    FactoryGirl.create(:transaction, bank_account: bank_account, amount: 125.00)
    FactoryGirl.create(:transaction, bank_account: bank_account, amount: -55.50)
    FactoryGirl.create(:transaction, bank_account: bank_account, amount: 250.00)

    assert_equal(319.50, bank_account.balance)
  end
end
