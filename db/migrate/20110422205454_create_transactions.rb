class CreateTransactions < ActiveRecord::Migration
  def self.up
    create_table :transactions do |t|
      t.integer :bank_account_id
      t.integer :account_id
      t.date :date
      t.text :description
      t.float :amount
      t.text :note

      t.timestamps
    end
  end

  def self.down
    drop_table :transactions
  end
end
