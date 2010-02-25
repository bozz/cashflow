class CreateAccountsReportsJoin < ActiveRecord::Migration
  def self.up
    create_table 'accounts_reports', :id => false do |t|
      t.column 'account_id', :integer
      t.column 'report_id', :integer
    end
  end

  def self.down
    drop_table 'accounts_reports'
  end
end
