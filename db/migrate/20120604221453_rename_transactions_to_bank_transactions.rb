class RenameTransactionsToBankTransactions < ActiveRecord::Migration
  def up
    rename_table :transactions, :bank_transactions
  end
end
