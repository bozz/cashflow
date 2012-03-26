require 'minitest_helper'

class TransactionTest < MiniTest::Unit::TestCase

  def test_create_empty_transaction
    transaction = Transaction.new
    assert_equal(false, transaction.valid?)
    assert_raises ActiveRecord::RecordInvalid do
       transaction.save!
    end
  end

  def test_create_valid_transaction
    transaction = FactoryGirl.build(:transaction)
    assert transaction.save!
  end

  def test_bank_account_required
    transaction = FactoryGirl.build(:transaction, bank_account_id: "")
    assert_equal(false, transaction.valid?)
  end

  def test_date_required
    transaction = FactoryGirl.build(:transaction, date: "")
    assert_equal(false, transaction.valid?)
  end

  def test_amount_required
    transaction = FactoryGirl.build(:transaction, amount: "")
    assert_equal(false, transaction.valid?)
  end

  def test_bank_account_association
    transaction = FactoryGirl.build(:transaction)
    assert_respond_to(transaction, :bank_account)
    assert_kind_of(BankAccount, transaction.bank_account)
  end
end
