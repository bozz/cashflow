class Report < ActiveRecord::Base
  attr_accessible :name, :type, :chart_type, :beginning_at, :ending_at
  validates_presence_of :name
end
