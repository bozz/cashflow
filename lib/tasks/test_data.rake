namespace :app do
  desc <<-DESC
    Load testing data.
    Run using the command 'rake app:load_demo_data'
  DESC
  task :load_demo_data => [:environment] do

    # Only data not required in production should be here.
    # If it needs to be there in production, it belongs in seeds.rb.

    number_transactions = 150

    BankAccount.delete_all
    bank1 = BankAccount.create(:name => "BigBank", :bank => "BigBank", :account_number => 838892334)
    bank2 = BankAccount.create(:name => "Bank of Scotland", :bank => "Bank of Scotland", :account_number => 21392334)

    Transaction.delete_all

    t_date = DateTime.now
    number_transactions.times do
      t_date = t_date - rand(3)
      amount = (rand(100000)-50000) * 0.01
      Transaction.create(:bank_account => bank1, :date => t_date, :amount => amount, :description => "Invoice number: #{rand(10000)}")
    end
  end
end
