class Account < ActiveRecord::Base

  validates :name,        :presence => true
  validates :identifier,  :presence => true,
                          :numericality => { :only_integer => true },
                          :length => { is: 4 }

end
