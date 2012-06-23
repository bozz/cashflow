class AddAccountIdToPosting < ActiveRecord::Migration
  def change
    add_column :postings, :account_id, :integer
  end
end
