class CreateReportsTagGroupsJoin < ActiveRecord::Migration
  def self.up
    create_table 'reports_tag_groups', :id => false do |t|
      t.column 'report_id', :integer
      t.column 'tag_group_id', :integer
    end
  end

  def self.down
    drop_table 'reports_tag_groups'
  end
end
