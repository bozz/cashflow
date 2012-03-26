class ModifyAmountForTransactions < ActiveRecord::Migration
  def up
    remove_column :transactions, :amount
    add_column :transactions, :cents, :integer, :null => false, :default => 0
    add_column :transactions, :currency, :string, :null => false, :default => "EUR"
  end

  def down
    remove_column :transactions, :cents
    remove_column :transactions, :currency
    add_column :transactions, :amount, :float
  end
end
