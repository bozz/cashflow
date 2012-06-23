class CreatePostings < ActiveRecord::Migration
  def up
    create_table :postings do |t|
      t.date    "date"
      t.text    "description"
      t.integer "cents"
      t.string  "currency"

      t.timestamps
    end
  end

  def down
    drop_table :postings
  end
end
