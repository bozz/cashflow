
FactoryGirl.define do
  factory :bank_account do
    bank "BigBank"
    account_number 111111
    currency "EUR"
  end

  factory :transaction do
    bank_account
    date Time.local(2012, 2, 20)
    amount 99.99
  end

  factory :account do
    name "Test Account"
    identifier "1200"
    description "the description"
  end
end
