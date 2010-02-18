Factory.define :valid_transaction , :class => Transaction do |t|
  t.association :account
  t.date Date.parse("2010-01-01")
  t.description "This is a test transaction."
  t.amount 99.99
end

Factory.define :invalid_transaction , :class => Transaction do |t|
end