class AddAccountTypeToAccounts < ActiveRecord::Migration
  def change
    add_column :accounts, :account_type, :string, :null => false, :default => "asset"
  end
end
