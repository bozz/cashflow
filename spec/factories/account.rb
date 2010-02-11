Factory.define :account , :class => Account do |f|
  f.sequence(:name) { |n| "Bank#{n}" }
  f.sequence(:bank) { |n| "Bank#{n}" }
  f.number "123456789"
  f.description "test account"
end

Factory.define :invalid_account, :class => Account do |f|
end