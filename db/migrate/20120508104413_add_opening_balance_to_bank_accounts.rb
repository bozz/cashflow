class AddOpeningBalanceToBankAccounts < ActiveRecord::Migration
  def change
    add_column :bank_accounts, :currency, :string, :null => false, :default => "EUR"
    add_column :bank_accounts, :initial_cents, :integer, :null => false, :default => 0
  end
end
