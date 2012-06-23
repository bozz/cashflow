class CreateLedgers < ActiveRecord::Migration
  def up
    create_table :ledgers do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end

  def down
    drop_table :ledgers
  end
end
