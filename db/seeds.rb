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
  { :name => 'Telefon', :identifier => '0003' },
  { :name => 'Privat', :identifier => '0004' }
])

transactions = Transaction.create([
  { :bank_account => bank_account, :account => accounts.first,  :date => '2011-02-02', :description => 'Miete Februar', :amount => 550 },
  { :bank_account => bank_account, :account => accounts.third,  :date => '2011-02-06', :description => 'Telekom Januar', :amount => -39.90 },
  { :bank_account => bank_account, :account => accounts.second, :date => '2011-02-10', :description => 'Druckerpatronen', :amount => -24.90 },
  { :bank_account => bank_account, :account => accounts.last,   :date => '2011-02-13', :description => 'Privatentnahme', :amount => -150 },
  { :bank_account => bank_account, :account => accounts.second, :date => '2011-02-18', :description => 'Briefmarken', :amount => -5.50 },
  { :bank_account => bank_account, :account => accounts.last,   :date => '2011-02-19', :description => 'Privatentnahme', :amount => -220 }
])
