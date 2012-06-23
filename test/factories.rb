
FactoryGirl.define do
  factory :ledger do
    name "Business"
    description "business accounting"
  end

  factory :account do
    ledger
    name "Test Account"
    identifier "1200"
    description "the description"
  end

  factory :posting do
    account
    # association :double_posting, factory: :posting
    date Time.local(2012, 5, 15)
    description "transfer"
    amount 140.00
  end

  factory :bank_account do
    bank "BigBank"
    name "BigBank"
    account_number 111111
    currency "EUR"
  end

  factory :bank_transaction do
    bank_account
    date Time.local(2012, 2, 20)
    amount 99.99
  end

end
