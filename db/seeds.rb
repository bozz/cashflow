# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

bank_account = BankAccount.create({
  :name => 'Geschäftskonto',
  :bank => 'Deutsche Bank',
  :account_number => "123456"
})

accounts = Account.create([
  { :name => 'Miete', :identifier => '0001' },
  { :name => 'Bürobedarf', :identifier => '0002' },
  { :name => 'Telefon', :identifier => '0003' }
])

transactions = Transaction.create(
  { :bank_account => bank_account, :account => accounts.first, :date => '2011-02-02', :description => 'Miete Februar', :amount => 550 }
)
