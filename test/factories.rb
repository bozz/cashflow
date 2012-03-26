
FactoryGirl.define do
  factory :bank_account do
    bank "BigBank"
    account_number 111111
  end

  factory :transaction do
    bank_account
    date Time.local(2012, 2, 20)
    amount 99.99
  end
end
