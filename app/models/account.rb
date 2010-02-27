class Account < ActiveRecord::Base
  has_and_belongs_to_many :reports
  attr_accessible :name, :bank, :number, :description
  has_many :transactions
  
  validates_presence_of :name
  
  def calculate_balance(balance_at)
    
    logger.info "test: #{balance_at}"
    
    balance = transactions.sum('amount', :conditions => "date < '" + balance_at + "'")
    #Account.find_by_sql("put sql text here between double quotes")
    return balance
  end
end
