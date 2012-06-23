require 'unit_test_helper'

class LedgerTest < MiniTest::Unit::TestCase

  def test_create_empty_ledger
    ledger = Ledger.new
    assert_equal(false, ledger.valid?)
    assert_raises ActiveRecord::RecordInvalid do
       ledger.save!
    end
  end

  def test_create_valid_ledger
    ledger = FactoryGirl.build(:ledger)
    assert ledger.save!
  end

  def test_name_required
    ledger = FactoryGirl.build(:ledger, name: "")
    assert_equal(false, ledger.valid?)
  end

  def test_account_association
    ledger = FactoryGirl.build(:ledger)
    assert_respond_to(ledger, :accounts)
    assert_kind_of(Array, ledger.accounts)
  end
end
