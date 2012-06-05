require 'unit_test_helper'

class BankTransactionTest < MiniTest::Unit::TestCase

  def test_create_empty_transaction
    transaction = BankTransaction.new
    assert_equal(false, transaction.valid?)
    assert_raises ActiveRecord::RecordInvalid do
       transaction.save!
    end
  end

  def test_create_valid_transaction
    transaction = FactoryGirl.build(:bank_transaction)
    assert transaction.save!
  end

  def test_bank_account_required
    transaction = FactoryGirl.build(:bank_transaction, bank_account_id: "")
    assert_equal(false, transaction.valid?)
  end

  def test_date_required
    transaction = FactoryGirl.build(:bank_transaction, date: "")
    assert_equal(false, transaction.valid?)
  end

  def test_amount_required
    transaction = FactoryGirl.build(:bank_transaction, amount: "")
    assert_equal(false, transaction.valid?)
  end

  def test_bank_account_association
    transaction = FactoryGirl.build(:bank_transaction)
    assert_respond_to(transaction, :bank_account)
    assert_kind_of(BankAccount, transaction.bank_account)
  end


  # CSV Import Tests

  def test_valid_csv_import
    csv_file = <<-eos
date;description;amount;currency
01.01.2012;test transaction 1;100,00;EUR
02.01.2012;another transaction;-49,99;EUR
    eos

    bank_account = FactoryGirl.create(:bank_account)
    BankTransaction.import_csv(csv_file, bank_account)
    assert_equal(2, BankTransaction.count)
  end

  def test_csv_invalid_delimiter
    csv_file = <<-eos
date,description,amount,currency
01.01.2012,test transaction 1,100,00,EUR
02.01.2012;another transaction;-49,99;EUR
    eos

    bank_account = FactoryGirl.create(:bank_account)
    assert_raises ActiveRecord::UnknownAttributeError do
      BankTransaction.import_csv(csv_file, bank_account)
    end
  end
end
