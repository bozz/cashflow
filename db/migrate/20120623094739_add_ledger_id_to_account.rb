class AddLedgerIdToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :ledger_id, :integer

  end
end
