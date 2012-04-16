# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bank_account = BankAccount.create({bank: "BigBank", account_number: 111111})

Transaction.create!({bank_account: bank_account, date: Time.local(2012,2,20), amount: 50})
Transaction.create!({bank_account: bank_account, date: Time.local(2012,2,23), amount: -78})
Transaction.create!({bank_account: bank_account, date: Time.local(2012,2,27), amount: 150})
