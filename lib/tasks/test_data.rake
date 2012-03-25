namespace :app do
  desc <<-DESC
    Load testing data.
    Run using the command 'rake app:load_demo_data'
  DESC
  task :load_demo_data => [:environment] do

    # Only data not required in production should be here.
    # If it needs to be there in production, it belongs in seeds.rb.

    BankAccount.delete_all
    bank1 = BankAccount.create(:name => "BigBank", :bank => "BigBank", :account_number => 838892334)
    bank2 = BankAccount.create(:name => "Bank of Scotland", :bank => "Bank of Scotland", :account_number => 21392334)

    Transaction.delete_all
    Transaction.create(:bank_account => bank1, :date => Time.local(2008, 7, 8), :amount => 34.45)
    Transaction.create(:bank_account => bank1, :date => Time.local(2008, 8, 12), :amount => -182.95)
    Transaction.create(:bank_account => bank1, :date => Time.local(2008, 9, 1), :amount => -69.00)
    Transaction.create(:bank_account => bank2, :date => Time.local(2008, 6, 18), :amount => -25.00)
    Transaction.create(:bank_account => bank2, :date => Time.local(2008, 11, 5), :amount => -9.99)

  end
end
