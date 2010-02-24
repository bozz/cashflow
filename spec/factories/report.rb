Factory.define :report , :class => Report do |f|
  f.sequence(:name) { |n| "Test Report #{n}" }
  f.type "BasicReport"
  #f.sequence(:bank) { |n| "Bank#{n}" }
  #f.number "123456789"
end

Factory.define :invalid_report, :class => Report do |f|
end