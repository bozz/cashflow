class TagGroup < ActiveRecord::Base
  attr_accessible :name, :tag_list
  validates_presence_of :name
  
  has_and_belongs_to_many :reports
  acts_as_taggable_on :tags
end