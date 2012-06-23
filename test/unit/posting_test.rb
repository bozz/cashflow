require 'unit_test_helper'

class PostingTest < MiniTest::Unit::TestCase

  def test_create_empty_posting
    posting = Posting.new
    assert_equal(false, posting.valid?)
    assert_raises ActiveRecord::RecordInvalid do
       posting.save!
    end
  end

  def test_create_valid_posting
    posting = FactoryGirl.build(:posting)
    assert posting.save!
  end

  def test_date_required
    posting = FactoryGirl.build(:posting, date: "")
    assert_equal(false, posting.valid?)
  end

  def test_amount_required
    posting = FactoryGirl.build(:posting, amount: "")
    assert_equal(false, posting.valid?)
  end

  def test_account_association
    posting = FactoryGirl.build(:posting)
    assert_respond_to(posting, :account)
    assert_kind_of(Account, posting.account)
  end

  def test_double_posting_association
    posting = FactoryGirl.build(:posting)
    # assert_respond_to(posting, :double_posting)
    # assert_kind_of(Posting, posting.double_posting)
  end
end
