class CreateReports < ActiveRecord::Migration
  def self.up
    create_table :reports do |t|
      t.string :name
      t.string :type        # STI type: BasicReport, RecurrentSumReport
      t.string :chart_type  # bar, line
      t.string :recurrence  # daily, weekly, monthly, yearly
      t.date  :beginning_at
      t.date  :ending_at
      t.timestamps
    end
  end
  
  def self.down
    drop_table :reports
  end
end
