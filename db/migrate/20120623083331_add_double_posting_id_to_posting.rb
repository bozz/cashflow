class AddDoublePostingIdToPosting < ActiveRecord::Migration
  def change
    add_column :postings, :double_posting_id, :integer
  end
end
