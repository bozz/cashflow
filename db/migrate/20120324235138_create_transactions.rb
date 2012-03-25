class CreateTransactions < ActiveRecord::Migration
  def self.up
    create_table :transactions do |t|
      t.integer :bank_account_id, :null => false
      t.date :date,               :null => false
      t.text :description
      t.float :amount,            :null => false
      t.text :note

      t.timestamps
    end
  end

  def self.down
    drop_table :transactions
  end
end
