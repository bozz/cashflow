# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bank_account = BankAccount.create({bank: "BigBank", name: "BigBank", account_number: 111111})

BankTransaction.create!({bank_account: bank_account, date: Time.local(2012,2,20), amount: 50})
BankTransaction.create!({bank_account: bank_account, date: Time.local(2012,2,23), amount: -78})
BankTransaction.create!({bank_account: bank_account, date: Time.local(2012,2,27), amount: 150})

Account.create!({name: "Assets", identifier: "0000"})
Account.create!({name: "Liabilities", identifier: "1000"})
Account.create!({name: "Equity", identifier: "2000"})
Account.create!({name: "Revenue", identifier: "3000"})
