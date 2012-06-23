class Account < ActiveRecord::Base

  belongs_to :ledger
  has_many :postings

  validates :name,        :presence => true
  validates :identifier,  :presence => true,
                          :uniqueness => true,
                          :numericality => { :only_integer => true },
                          :length => { is: 4 }

  scope :find_all_by_ledger, lambda { |ledger_id| where("ledger_id = ?", ledger_id) }

end
