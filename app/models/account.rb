class Account < ActiveRecord::Base

  belongs_to :ledger
  has_many :postings

  validates :name,        :presence => true
  validates :identifier,  :presence => true,
                          :uniqueness => true,
                          :numericality => { :only_integer => true },
                          :length => { is: 4 }

  scope :withIdAndLedger, lambda { |id, ledger_id| where("id = ? AND ledger_id = ?", id, ledger_id) }

end
