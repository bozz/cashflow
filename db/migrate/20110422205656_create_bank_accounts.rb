class CreateBankAccounts < ActiveRecord::Migration
  def self.up
    create_table :bank_accounts do |t|
      t.string :name
      t.string :bank
      t.integer :account_number
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :bank_accounts
  end
end
